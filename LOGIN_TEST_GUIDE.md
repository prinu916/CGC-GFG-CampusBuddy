# Complete Login Flow Testing Guide

This guide provides step-by-step instructions to test the complete role-based login flow for admin, team, and student users.

## Test Credentials

### Admin Login
- **Email:** `Harshita2026@CMgfg.cb`
- **Password:** `2420356`
- **Expected Route:** `/admin` → Admin Dashboard
- **Expected Features:** Manage announcements, events, users, workshops, and team

### Team Login
- **Email:** `tushar2026@gfg.cb`
- **Password:** `2330219`
- **Branch:** Technical
- **Expected Route:** `/team` → Team Dashboard
- **Expected Features:** View announcements, events, and manage team tasks

### Student Login
- **Email:** `You2026@gfg.cb` (placeholder - create via signup first, or use any email with role 'student')
- **Expected Route:** `/student` → Student Dashboard
- **Expected Features:** View announcements, events, access AI Solver, view team members

## Test Steps

### Step 1: Test Admin Login
1. Navigate to `http://localhost:5173/login`
2. Enter email: `Harshita2026@CMgfg.cb`
3. Enter password: `2420356`
4. Click "Sign In"
5. **Expected:** 
   - Success toast notification: "Login successful - Welcome Harshita!"
   - Redirected to `/admin`
   - Admin dashboard displays with full admin options (Users, Announcements, Events, Workshops, Team)

### Step 2: Test Team Login
1. Logout from admin account
2. Return to login page
3. Enter email: `tushar2026@gfg.cb`
4. Enter password: `2330219`
5. Click "Sign In"
6. **Expected:**
   - Success toast notification: "Login successful - Welcome tushar!"
   - Redirected to `/team`
   - Team dashboard displays with team features (Announcements, Events, Members)

### Step 3: Test Student Login (via Signup)
1. Navigate to `/signup`
2. Enter name: `Test Student`
3. Enter email: `teststudent@gfg.cb`
4. Enter password: `testpass123`
5. Select role: `Student`
6. Click "Sign Up"
7. **Expected:**
   - Success toast notification: "Signup successful - Welcome Test Student!"
   - Redirected to `/student`
   - Student dashboard displays with student features

### Step 4: Test Session Persistence
1. With student logged in, refresh the page
2. **Expected:** User remains logged in, still on student dashboard
3. Check browser localStorage: `cc_user` should contain the student data

### Step 5: Test Role-Based Routing Protection
1. Logged in as student, try to access `/admin` directly
2. **Expected:** Either redirected to `/` or sees permission denied
3. Repeat with each role accessing other role routes

### Step 6: Test Logout
1. Click logout button in any dashboard
2. **Expected:**
   - Toast notification: "Logged out"
   - Redirected to login page
   - `cc_user` localStorage item removed

## Expected Behaviors

### ✅ Successful Login
- Toast notification appears
- Correct navigation based on role
- User data stored in localStorage
- Dashboard displays role-specific content
- Session persists on page refresh

### ❌ Failed Login
- Email/password not matching any user
- Error toast: "Invalid credentials - Your Login is Invalid contact to your admin Priyanshu!!"
- Remains on login page
- No localStorage data saved

### Role-Specific Dashboards

#### Admin Dashboard (`/admin`)
- User management (view/add/delete users)
- Announcements management
- Events management
- Workshops management
- Team management
- Team member management

#### Team Dashboard (`/team`)
- View announcements (filtered by team branch)
- View events
- Team members list
- Team-specific tasks/workflows
- Cannot edit announcements/events (read-only or limited permissions)

#### Student Dashboard (`/student`)
- View announcements (read-only)
- View events and register for them
- View workshops
- Access AI Doubt Solver
- View team members and their profiles
- College Connect page

## Test Cases Summary

| Test Case | Input | Expected Output | Status |
|-----------|-------|-----------------|--------|
| Admin login valid | Harshita@CMgfg.cb / 2420356 | Redirected to /admin | ⏳ |
| Team login valid | tushar@gfg.cb / 2330219 | Redirected to /team | ⏳ |
| Student signup | name, email, pwd, role=student | Redirected to /student | ⏳ |
| Invalid email | fake@email.com / anypass | Error toast shown | ⏳ |
| Invalid password | Harshita@CMgfg.cb / wrongpwd | Error toast shown | ⏳ |
| Session persistence | Refresh page after login | User still logged in | ⏳ |
| Logout | Click logout | Redirected to /login | ⏳ |
| Cross-role routing | Student accessing /admin | Denied/Redirected | ⏳ |

## Troubleshooting

### Issue: Login button not working
- Check browser console for errors
- Ensure credentials match exactly (case-sensitive for emails)
- Clear localStorage: Open DevTools → Application → localStorage → Remove `cc_user` entry

### Issue: Redirects not working
- Check that react-router setup is correct in App.tsx
- Verify routes are properly defined
- Check for navigation guards

### Issue: Session not persisting
- Check localStorage is enabled in browser
- Verify `cc_user` key exists in localStorage after login
- Check if browser cookies are cleared on close

### Issue: Wrong dashboard displays
- Verify user.role is correctly set (should be 'admin', 'team', or 'student')
- Check role-based routing logic in App.tsx or dashboard components
- Inspect user object in localStorage

## Next Steps

After testing the login flow:
1. ✅ Verify all three roles can login
2. ✅ Verify role-based routing works
3. ✅ Verify session persistence works
4. → Integrate with Lovable Cloud for real authentication
5. → Connect AI Solver to real AI API
6. → Implement real-time notifications
