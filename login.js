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
        const cred = this.querySelector('.account-cred').textContent;
        // Extract just the email part
        const email = cred.split(' ')[0];

        // Fill in the username field
        document.getElementById('username').value = email;

        // Focus on password field
        document.getElementById('password').focus();

        // Show toast
        M.toast({html: 'Demo account selected. Enter password: ' + email.split('@')[0], classes: 'blue'});
    });
});
