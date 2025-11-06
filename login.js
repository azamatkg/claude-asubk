// Check if user is already logged in
if (Auth.isAuthenticated()) {
    window.location.href = 'main.html';
}

// ============================================
// LOGIN FORM HANDLER
// ============================================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error
    errorMessage.classList.remove('show');
    errorMessage.innerHTML = '';

    // Attempt login
    const result = Auth.login(username, password);

    if (result.success) {
        // Show success and redirect
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 800);
    } else {
        // Show error message
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + result.message;
        errorMessage.classList.add('show');
    }
});

// ============================================
// DEMO ACCOUNTS CLICK HANDLER
// ============================================
document.querySelectorAll('.demo-account').forEach(account => {
    account.addEventListener('click', function(e) {
        const username = this.getAttribute('data-username');
        const password = this.getAttribute('data-password');
        const roleElement = this.querySelector('.account-role');
        const role = roleElement.textContent.trim();

        // Fill in both username and password fields
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;

        // Show Bootstrap toast notification
        showToast('Demo account selected: ' + role);
    });
});

// ============================================
// BOOTSTRAP TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'info') {
    // Create a toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Determine toast styling based on type
    let toastClass = 'toast align-items-center text-bg-info border-0';
    let icon = 'fas fa-info-circle';

    if (type === 'success') {
        toastClass = 'toast align-items-center text-bg-success border-0';
        icon = 'fas fa-check-circle';
    } else if (type === 'error') {
        toastClass = 'toast align-items-center text-bg-danger border-0';
        icon = 'fas fa-exclamation-circle';
    } else if (type === 'warning') {
        toastClass = 'toast align-items-center text-bg-warning border-0';
        icon = 'fas fa-exclamation-triangle';
    }

    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = toastClass;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="${icon}" style="margin-right: 0.5rem;"></i> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);

    // Show toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    // Remove element after it's hidden
    toastEl.addEventListener('hidden.bs.toast', function() {
        toastEl.remove();
    });
}
