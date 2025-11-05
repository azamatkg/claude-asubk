// Protect this page - redirect to login if not authenticated
requireAuth();

// Get current user
const currentUser = Auth.getCurrentUser();

// Populate user profile in navbar
document.getElementById('navUsername').textContent = currentUser.fullName;

// Populate profile card
document.getElementById('profileName').textContent = currentUser.fullName;
document.getElementById('profileRole').textContent = currentUser.role;

// Populate profile details
document.getElementById('detailUsername').textContent = currentUser.username;
document.getElementById('detailName').textContent = currentUser.fullName;
document.getElementById('detailRole').textContent = currentUser.role;
document.getElementById('detailEmail').textContent = currentUser.email;
document.getElementById('detailDepartment').textContent = currentUser.department;
document.getElementById('detailEmployeeId').textContent = currentUser.employeeId;

// Format and display last login time
const loginTime = new Date(currentUser.loginTime);
document.getElementById('detailLastLogin').textContent = loginTime.toLocaleString();

// Populate permissions
const permissionsList = document.getElementById('permissionsList');
const permissionIcons = {
    'view_all': 'visibility',
    'edit_all': 'edit',
    'approve_loans': 'check_circle',
    'manage_users': 'people',
    'view_reports': 'assessment',
    'manage_settings': 'settings',
    'view_loans': 'description',
    'create_loans': 'add_circle',
    'edit_loans': 'edit',
    'view_customers': 'person',
    'review_loans': 'rate_review',
    'vote_on_loans': 'how_to_vote',
    'approve_commission': 'verified',
    'assess_collateral': 'home',
    'create_valuations': 'attach_money'
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

currentUser.permissions.forEach(permission => {
    const col = document.createElement('div');
    col.className = 'col s12 m6 l4';

    const badge = document.createElement('div');
    badge.className = 'permission-badge';
    badge.innerHTML = `
        <i class="material-icons">${permissionIcons[permission] || 'check'}</i>
        ${permissionLabels[permission] || permission}
    `;

    col.appendChild(badge);
    permissionsList.appendChild(col);
});

// Populate recent activity
const activityList = document.getElementById('activityList');
const activities = Auth.getUserActivity();

if (activities.length === 0) {
    activityList.innerHTML = '<li class="collection-item grey-text">No recent activity</li>';
} else {
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerHTML = `
            <div class="activity-item">
                <i class="material-icons activity-icon">${activity.icon}</i>
                <div>
                    <div>${activity.action}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `;
        activityList.appendChild(li);
    });
}

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();

    // Show confirmation toast
    M.toast({html: 'Logging out...', classes: 'orange'});

    setTimeout(() => {
        Auth.logout();
    }, 1000);
});

// Handle profile link click (just for demo, stays on same page)
document.getElementById('navProfile').addEventListener('click', function(e) {
    e.preventDefault();
    M.toast({html: 'Already on profile page', classes: 'blue'});
});

// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();

    // Show welcome toast
    M.toast({html: `Welcome back, ${currentUser.fullName}!`, classes: 'green'});
});
