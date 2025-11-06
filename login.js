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
    errorMessage.textContent = '';

    // Attempt login
    const result = Auth.login(username, password);

    if (result.success) {
        // Show success and redirect
        M.toast({html: 'Login successful! Redirecting...', classes: 'green'});
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 800);
    } else {
        // Show error message
        errorMessage.textContent = result.message;
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
        const role = this.querySelector('.account-role').textContent;

        // Fill in both username and password fields
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;

        // Show toast
        M.toast({html: 'Demo account selected: ' + role, classes: 'blue'});
    });
});
