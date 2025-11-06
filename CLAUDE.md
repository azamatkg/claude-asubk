# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Loan Management System** - a client-side web application demonstrating a role-based access control (RBAC) system for loan processing workflows. It's a single-page application (SPA) with no backend, using localStorage for mock authentication and session management.

**Key Characteristics**:
- Static HTML/CSS/JavaScript (no build tools required)
- Client-side only with mock authentication
- 5 user roles: Admin, Loan Officer, Commission Member, Commission Head, Collateral Officer
- Material Design UI using Materialize CSS framework
- Not production-ready (demonstration/prototype only)

## Architecture & Technology Stack

### Core Technologies
- **HTML5/CSS3/JavaScript (Vanilla)**: No frameworks (no React, Vue, Angular, etc.)
- **Materialize CSS 1.0.0**: Material Design CSS framework via CDN
- **Google Fonts & Material Icons**: Loaded from CDN
- **localStorage API**: Session and user state persistence

### Architecture Pattern
- **Single Page Application** with two main pages:
  - `index.html` - Login page (authentication entry point)
  - `main.html` - Dashboard/profile page (protected, requires authentication)
- **No backend server** - All logic runs client-side
- **No database** - Data hardcoded in MOCK_USERS array in auth.js
- **No build/compilation** - Files serve directly via HTTP

### State Management
- **Single source of truth**: localStorage key `currentUser` stores logged-in user
- **No state library** (Redux, Context, etc.)
- **Session structure**:
  ```javascript
  {
    username, role, fullName, email, department,
    employeeId, permissions: [...], loginTime
  }
  ```

## File Structure & Key Modules

### Main Files
| File | Purpose |
|------|---------|
| `index.html` | Login page with form and demo credentials |
| `main.html` | Protected dashboard showing user profile, permissions, activity |
| `auth.js` | Core module: `Auth.login()`, `Auth.logout()`, `Auth.isAuthenticated()`, `Auth.getCurrentUser()`, `Auth.hasPermission()`, user definitions |
| `login.js` | Form submission handler with validation and error display |
| `main.js` | Dashboard logic: populate profile data, init Materialize components, logout handler |
| `styles.css` | Global styling and responsive design |

### Authentication & Authorization
- **Mock Users** (in `auth.js`): `admin/admin123`, `officer/officer123`, `member/member123`, `head/head123`, `collateral/collateral123`
- **Permissions**: Each role has role-specific permission array (e.g., Admin has `view_all`, `edit_all`, `approve_loans`, etc.)
- **Protection**: `requireAuth()` function guards `main.html` from unauthenticated access
- **Session Check**: `Auth.isAuthenticated()` validates localStorage presence

## Development & Testing

### Running the Application
No build tools needed. Serve static files via HTTP:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```
Then visit `http://localhost:8000/index.html`

### Manual Testing Checklist
1. **Login/Logout**: Test each role with provided credentials
2. **Session Persistence**: Refresh page while logged in, verify session maintained
3. **Authentication**: Attempt access to `main.html` without login (should redirect)
4. **Permissions Display**: Verify correct permissions shown per role
5. **Activity Log**: Verify mock activity appears per role
6. **Responsive Design**: Test on mobile, tablet, desktop viewports

### No Automated Tests
- No test suite currently exists (no Jest, Mocha, etc.)
- Recommended future addition: Unit tests for `auth.js` functions, E2E tests with Cypress/Playwright

## Common Development Tasks

### Adding a New User Role
1. Add role definition to `MOCK_USERS` array in `auth.js`
2. Add permissions array for the role
3. Update role references in `generateMockActivity()` function
4. Add role display in `main.js` if needed

### Adding New Permissions
1. Define permission string in role's `permissions` array in `auth.js`
2. Use `Auth.hasPermission('permission_name')` to check in code
3. Currently no UI enforcement of permissions (only display)

### Modifying the Dashboard Display
1. Edit HTML structure in `main.html`
2. Update population logic in `main.js`
3. Add styles to `styles.css`
4. Initialize new Materialize components via `M.AutoInit()`

### Adding a New Page
1. Create new `.html` file with structure similar to `main.html`
2. Create corresponding `.js` file with page logic
3. Call `requireAuth()` in the JS file for protected pages
4. Use `Auth.getCurrentUser()` to access logged-in user data

## Important Implementation Details

### Form Validation
- **Login form** (login.js): Basic presence check on username/password
- No email/password format validation
- All errors display in DOM with visual feedback (shake animation)

### Activity Log
- Mock activity generated per role in `generateMockActivity()` function
- Not persisted - regenerated on each page load
- Include timestamp for display purposes

### UI Component Initialization
- Materialize components require `M.AutoInit()` call in JavaScript
- Called in `main.js` after DOM population
- Some components (toasts, modals) auto-initialize

### Responsive Design
- Mobile-first approach with media queries in `styles.css`
- Materialize grid system handles responsive layout
- Test on multiple viewport sizes

## Known Limitations & Security Notes

### Not Production-Ready
- Hardcoded credentials in source code
- No password hashing or encryption
- localStorage accessible via XSS
- No CSRF protection
- No rate limiting or account lockout
- No session timeout
- Single session per browser

### Intended Use
- UI/UX demonstration
- Workflow prototyping
- Educational example of RBAC systems
- Design pattern reference

### Future Enhancements Would Require
- Backend API (Node.js/Express, Python/Flask, etc.)
- Real database (PostgreSQL, MongoDB, etc.)
- Proper authentication (JWT, OAuth, sessions)
- Form validation and submission
- Actual loan processing workflows
- Audit logging and activity tracking
- Unit and integration tests

## Dependencies

### External CDN Dependencies (No npm)
- **Materialize CSS 1.0.0**: Framework and components
- **Google Fonts**: Roboto font family
- **Material Icons**: Icon library
- All loaded via CDN links in HTML `<head>`

### No Package.json
- No npm dependencies
- No build or compilation step
- No node_modules directory

## Useful References

- **Materialize Docs**: https://materializecss.com/
- **Material Icons**: https://fonts.google.com/icons
- **localStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **ES5 JavaScript Support**: All code compatible with modern browsers
