// Check if user is already logged in
if (Auth.isAuthenticated()) {
    window.location.href = 'main.html';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Attempt login
    const result = Auth.login(username, password);

    if (result.success) {
        // Show success and redirect
        M.toast({html: 'Login successful! Redirecting...', classes: 'green'});
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1000);
    } else {
        // Show error message
        errorMessage.textContent = result.message;
        errorMessage.style.display = 'block';

        // Shake the form for visual feedback
        const card = document.querySelector('.card');
        card.style.animation = 'shake 0.5s';
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
