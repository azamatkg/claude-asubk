// Protect this page - redirect to login if not authenticated
requireAuth();

// Get current user
const currentUser = Auth.getCurrentUser();

// Populate user profile in navbar
document.getElementById('userFullName').textContent = currentUser.fullName;

// Populate profile section header
document.getElementById('profileFullName').textContent = currentUser.fullName;
document.getElementById('profileRole').textContent = currentUser.role;

// Populate profile details
document.getElementById('profileUsername').textContent = currentUser.username;
document.getElementById('profileFullName2').textContent = currentUser.fullName;
document.getElementById('profileRole2').textContent = currentUser.role;
document.getElementById('profileEmail').textContent = currentUser.email;
document.getElementById('profileDepartment').textContent = currentUser.department;
document.getElementById('profileEmployeeId').textContent = currentUser.employeeId;

// Format and display last login time
const loginTime = new Date(currentUser.loginTime);
document.getElementById('profileLoginTime').textContent = loginTime.toLocaleString();

// Permission icons mapping (using Font Awesome classes)
const permissionIcons = {
    'view_all': 'fa-eye',
    'edit_all': 'fa-pen',
    'approve_loans': 'fa-check-circle',
    'manage_users': 'fa-users',
    'view_reports': 'fa-chart-bar',
    'manage_settings': 'fa-cog',
    'view_loans': 'fa-file-alt',
    'create_loans': 'fa-plus-circle',
    'edit_loans': 'fa-edit',
    'view_customers': 'fa-user',
    'review_loans': 'fa-eye',
    'vote_on_loans': 'fa-check',
    'approve_commission': 'fa-stamp',
    'assess_collateral': 'fa-home',
    'create_valuations': 'fa-dollar-sign'
};

const permissionLabels = {
    'view_all': 'View All',
    'edit_all': 'Edit All',
    'approve_loans': 'Approve Loans',
    'manage_users': 'Manage Users',
    'view_reports': 'View Reports',
    'manage_settings': 'Manage Settings',
    'view_loans': 'View Loans',
    'create_loans': 'Create Loans',
    'edit_loans': 'Edit Loans',
    'view_customers': 'View Customers',
    'review_loans': 'Review Loans',
    'vote_on_loans': 'Vote on Loans',
    'approve_commission': 'Approve Commission',
    'assess_collateral': 'Assess Collateral',
    'create_valuations': 'Create Valuations'
};

// Populate permissions grid
const permissionsList = document.getElementById('permissionsList');
permissionsList.innerHTML = ''; // Clear any existing content

if (currentUser.permissions.length === 0) {
    permissionsList.innerHTML = '<p class="text-muted">No permissions assigned</p>';
} else {
    currentUser.permissions.forEach(permission => {
        const permissionEl = document.createElement('div');
        permissionEl.className = 'permission-item';
        permissionEl.innerHTML = `
            <i class="fas ${permissionIcons[permission] || 'fa-check'}"></i>
            ${permissionLabels[permission] || permission}
        `;
        permissionsList.appendChild(permissionEl);
    });
}

// Populate recent activity
const activityList = document.getElementById('activityList');
const activities = Auth.getUserActivity();

if (activities.length === 0) {
    activityList.innerHTML = '<p class="text-muted">No recent activity</p>';
} else {
    activities.forEach(activity => {
        const activityEl = document.createElement('div');
        activityEl.className = 'activity-item';
        activityEl.innerHTML = `
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h6>${activity.action}</h6>
                <p>${activity.time}</p>
            </div>
        `;
        activityList.appendChild(activityEl);
    });
}

// ============================================
// LOGOUT HANDLERS
// ============================================
function handleLogout(e) {
    e.preventDefault();

    // Show confirmation toast
    showBootstrapToast('Logging out...', 'warning');

    setTimeout(() => {
        Auth.logout();
    }, 1000);
}

// Setup logout buttons
const logoutButtons = document.querySelectorAll('#logoutBtn, #logoutBtn2');
logoutButtons.forEach(btn => {
    btn.addEventListener('click', handleLogout);
});

// ============================================
// BOOTSTRAP TOAST HELPER
// ============================================
function showBootstrapToast(message, type = 'info') {
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

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome toast
    showBootstrapToast(`Welcome back, ${currentUser.fullName}!`, 'success');
});
