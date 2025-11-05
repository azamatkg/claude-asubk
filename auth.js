// Mock user data
const MOCK_USERS = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'Admin',
        fullName: 'John Administrator',
        email: 'admin@loanmanagement.com',
        department: 'Administration',
        employeeId: 'EMP001',
        permissions: ['view_all', 'edit_all', 'approve_loans', 'manage_users', 'view_reports', 'manage_settings']
    },
    {
        username: 'officer',
        password: 'officer123',
        role: 'Loan Officer',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@loanmanagement.com',
        department: 'Loan Processing',
        employeeId: 'EMP002',
        permissions: ['view_loans', 'create_loans', 'edit_loans', 'view_customers']
    },
    {
        username: 'member',
        password: 'member123',
        role: 'Commission Member',
        fullName: 'Michael Brown',
        email: 'michael.brown@loanmanagement.com',
        department: 'Loan Commission',
        employeeId: 'EMP003',
        permissions: ['view_loans', 'review_loans', 'vote_on_loans']
    },
    {
        username: 'head',
        password: 'head123',
        role: 'Commission Head',
        fullName: 'Emily Davis',
        email: 'emily.davis@loanmanagement.com',
        department: 'Loan Commission',
        employeeId: 'EMP004',
        permissions: ['view_loans', 'review_loans', 'vote_on_loans', 'approve_commission', 'view_reports']
    },
    {
        username: 'collateral',
        password: 'collateral123',
        role: 'Collateral Officer',
        fullName: 'David Wilson',
        email: 'david.wilson@loanmanagement.com',
        department: 'Risk Assessment',
        employeeId: 'EMP005',
        permissions: ['view_loans', 'assess_collateral', 'view_customers', 'create_valuations']
    }
];

// Mock activity data generator
function generateMockActivity(role) {
    const activities = {
        'Admin': [
            { action: 'Reviewed system settings', time: '2 hours ago', icon: 'settings' },
            { action: 'Generated monthly report', time: '1 day ago', icon: 'assessment' },
            { action: 'Updated user permissions', time: '2 days ago', icon: 'security' }
        ],
        'Loan Officer': [
            { action: 'Processed loan application #1234', time: '1 hour ago', icon: 'description' },
            { action: 'Updated customer profile', time: '3 hours ago', icon: 'person' },
            { action: 'Submitted loan for approval', time: '1 day ago', icon: 'send' }
        ],
        'Commission Member': [
            { action: 'Reviewed loan application #1235', time: '30 minutes ago', icon: 'rate_review' },
            { action: 'Voted on loan proposal', time: '2 hours ago', icon: 'how_to_vote' },
            { action: 'Attended commission meeting', time: '1 day ago', icon: 'event' }
        ],
        'Commission Head': [
            { action: 'Approved commission decision', time: '1 hour ago', icon: 'check_circle' },
            { action: 'Chaired commission meeting', time: '1 day ago', icon: 'event_seat' },
            { action: 'Reviewed quarterly metrics', time: '2 days ago', icon: 'trending_up' }
        ],
        'Collateral Officer': [
            { action: 'Completed property valuation', time: '45 minutes ago', icon: 'home' },
            { action: 'Assessed collateral for loan #1236', time: '2 hours ago', icon: 'assessment' },
            { action: 'Updated valuation report', time: '1 day ago', icon: 'description' }
        ]
    };

    return activities[role] || [];
}

// Authentication functions
const Auth = {
    // Login function
    login: function(username, password) {
        const user = MOCK_USERS.find(u => u.username === username && u.password === password);

        if (user) {
            // Store user data (excluding password) in localStorage
            const userData = {
                username: user.username,
                role: user.role,
                fullName: user.fullName,
                email: user.email,
                department: user.department,
                employeeId: user.employeeId,
                permissions: user.permissions,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));
            return { success: true, user: userData };
        }

        return { success: false, message: 'Invalid username or password' };
    },

    // Logout function
    logout: function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    },

    // Check if user is logged in
    isAuthenticated: function() {
        return localStorage.getItem('currentUser') !== null;
    },

    // Get current user
    getCurrentUser: function() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    // Check if user has specific permission
    hasPermission: function(permission) {
        const user = this.getCurrentUser();
        return user && user.permissions.includes(permission);
    },

    // Get mock activity for current user
    getUserActivity: function() {
        const user = this.getCurrentUser();
        return user ? generateMockActivity(user.role) : [];
    }
};

// Protect pages that require authentication
function requireAuth() {
    if (!Auth.isAuthenticated()) {
        window.location.href = 'index.html';
    }
}
