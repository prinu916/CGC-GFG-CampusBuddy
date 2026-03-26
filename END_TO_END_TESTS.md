# End-to-End Testing Guide

Complete testing procedures for all integrated features:
1. Login flow with role-based routing
2. Real authentication with Lovable (optional)
3. AI Doubt Solver with real AI integration
4. Real-time notifications with toast alerts

---

## Pre-Test Checklist

- [ ] Project dependencies installed: `npm install`
- [ ] Development server running: `npm run dev`
- [ ] No browser console errors
- [ ] localStorage cleared if needed: `localStorage.clear()`
- [ ] `.env.local` configured (if using real APIs)

---

## Test 1: Login Flow & Role-Based Routing

### 1.1 Admin Login

**Credentials:**
- Email: `Harshita2026@CMgfg.cb`
- Password: `2420356`

**Steps:**
1. Navigate to `http://localhost:5173/login`
2. Enter admin email and password
3. Click "Sign In"

**Expected Results:**
- ✅ Toast notification: "Login successful - Welcome Harshita!"
- ✅ Redirected to `/admin`
- ✅ Admin dashboard displays with full features:
  - Users management
  - Announcements management
  - Events management
  - Workshops management
  - Team management

**Test Duration:** ~1-2 minutes

---

### 1.2 Team Login

**Credentials:**
- Email: `tushar2026@gfg.cb`
- Password: `2330219`

**Prerequisites:** Logged out from admin account

**Steps:**
1. Navigate to login page
2. Enter team credentials
3. Click "Sign In"

**Expected Results:**
- ✅ Toast notification: "Login successful - Welcome tushar!"
- ✅ Redirected to `/team`
- ✅ Team dashboard displays with:
  - Announcements view
  - Events view
  - Team members list
- ✅ Admin features are NOT accessible

**Test Duration:** ~1-2 minutes

---

### 1.3 Student Login (Signup)

**Steps:**
1. Navigate to `/signup`
2. Enter details:
   - Name: `Test Student`
   - Email: `teststudent2026@gfg.cb`
   - Password: `testpass123`
   - Role: Select "Student"
3. Click "Sign Up"

**Expected Results:**
- ✅ Toast notification: "Signup successful - Welcome Test Student!"
- ✅ Redirected to `/student`
- ✅ Student dashboard displays with:
  - Announcements view
  - Events view
  - AI Doubt Solver access
  - Team members view
  - College Connect page

**Test Duration:** ~1-2 minutes

---

### 1.4 Session Persistence

**Steps:**
1. Logged in as student
2. Refresh the page (F5)
3. Wait for page to load

**Expected Results:**
- ✅ Still logged in, no redirect to login
- ✅ Still on student dashboard
- ✅ User data visible in profile/header
- ✅ localStorage contains `cc_user` with encrypted data

**Verification:**
```javascript
// In browser console
JSON.parse(localStorage.getItem('cc_user'))
// Should show: { id: "...", name: "Test Student", role: "student", ... }
```

**Test Duration:** ~1 minute

---

### 1.5 Cross-Role Access Prevention

**Steps:**
1. Logged in as student
2. Try to access `/admin` directly in URL
3. Then try `/team` directly

**Expected Results:**
- ✅ `/admin` redirects to `/student` or shows error
- ✅ `/team` redirects to `/student` or shows error
- ✅ Cannot access other roles' dashboards

**Test Duration:** ~1 minute

---

### 1.6 Logout Functionality

**Steps:**
1. Click "Logout" button in dashboard
2. Wait for redirect

**Expected Results:**
- ✅ Toast notification: "Logged out"
- ✅ Redirected to login page
- ✅ localStorage `cc_user` is cleared
- ✅ Clicking back button doesn't restore session

**Verification:**
```javascript
// In browser console after logout
localStorage.getItem('cc_user')
// Should return: null
```

**Test Duration:** ~1 minute

---

## Test 2: AI Doubt Solver

### 2.1 AI Without API Key (Mock Mode)

**Prerequisites:**
- Logged in as student
- No OpenAI/Cohere API key configured
- NOTE: If you have `.env.local` with VITE_OPENAI_API_KEY, this test will skip

**Steps:**
1. Navigate to `/student/ai`
2. See "AI Doubt Solver" page loads
3. Click on suggested question: "What is a data structure?"
4. Wait for response

**Expected Results:**
- ✅ Page displays with bot icon
- ✅ Suggested questions appear
- ✅ Response appears with predefined educational content
- ✅ Typing indicator shows while generating
- ✅ Message appears in chat history
- ✅ Response contains markdown formatting (bold, code blocks)

**Sample Response:**
```
**Data Structures** are ways to organize and store data efficiently.
- **Arrays**: Fixed-size, indexed collection
- **Linked Lists**: Dynamic nodes connected via pointers
...
```

**Test Duration:** ~2 minutes

---

### 2.2 AI With Real OpenAI API

**Prerequisites:**
- OpenAI API key created at https://platform.openai.com/api-keys
- `.env.local` configured:
```env
VITE_OPENAI_API_KEY=sk_test_your_key
```
- Dev server restarted after adding `.env.local`

**Steps:**
1. Re-Load `/student/ai`
2. Look for model indicator in header (should show "gpt-3.5-turbo")
3. Ask question: "Explain the QuickSort algorithm with a Python example"
4. Wait for response

**Expected Results:**
- ✅ Header shows "gpt-3.5-turbo" model indicator
- ✅ Green "Connected" status badge appears
- ✅ Response appears within 5-10 seconds
- ✅ Response includes real algorithm explanation
- ✅ Response includes actual Python code
- ✅ Response shows token count: "gpt-3.5-turbo • 156 tokens"
- ✅ Follows conversation context for follow-up questions

**Test Follow-up Questions:**
1. Ask: "Can you optimize that for better performance?"
2. AI should reference previous QuickSort discussion
3. Response should show different optimization technique

**Test Duration:** ~5 minutes

---

### 2.3 AI With Cohere API

**Prerequisites:**
- Cohere API key from https://dashboard.cohere.com
- `.env.local` configured:
```env
VITE_COHERE_API_KEY=your_cohere_key
VITE_OPENAI_API_KEY=  # Remove or comment out
```
- Dev server restarted

**Steps:**
1. Reload `/student/ai`
2. Check model indicator (should show "cohere-command")
3. Ask: "What is a hash table and when should I use it?"

**Expected Results:**
- ✅ Header shows "cohere-command" status
- ✅ Response within 3-5 seconds
- ✅ Clear explanation of hash tables
- ✅ Use cases mentioned

**Test Duration:** ~3 minutes

---

### 2.4 Error Handling

**Steps:**
1. Misconfigure API key (change one character)
2. Ask a question
3. Wait for error handling

**Expected Results:**
- ✅ Error toast appears: "Error: Invalid API key"
- ✅ Error message shown in chat
- ✅ Can still ask another question
- ✅ UI doesn't break, remains usable

**Test Duration:** ~2 minutes

---

## Test 3: Real-Time Notifications

### 3.1 Setup: Two Browser Windows

**Window 1 (Admin):**
- Logged in as: `Harshita2026@CMgfg.cb`
- Navigate to: `/admin/announcements`

**Window 2 (Student):**
- Logged in as: `Test Student` (from previous test)
- Navigate to: `/student`
- Look for notification bell in header (if implemented)

---

### 3.2 Test Announcement Notification

**Window 1 (Admin):**
1. Click "New Announcement" button
2. Fill in:
   - Title: "Test Announcement"
   - Content: "This is a test notification"
   - Target Roles: Check all (Admin, Team, Student)
3. Click "Create"

**Window 2 (Student):**
- Watch for toast notification at top of screen
- Should appear within 1-2 seconds
- Message: "New Announcement: Test Announcement..."

**Expected Results:**
- ✅ Window 2 shows toast immediately
- ✅ Toast has correct announcement title and preview
- ✅ Toast disappears after 3-5 seconds
- ✅ Announcements page refreshes automatically
- ✅ Click notification badge to view in panel

**Test Duration:** ~2 minutes

---

### 3.3 Test Event Notification

**Window 1 (Admin):**
1. Navigate to `/admin/events`
2. Click "New Event" button
3. Fill in:
   - Title: "Tech Workshop"
   - Description: "Python Workshop for Beginners"
   - Date: Tomorrow at 2:00 PM
   - Location: Computer Lab
4. Click "Create Event"

**Window 2 (Student):**
- Watch for Green toast notification
- Message: "New Event: Tech Workshop"
- Date shown: Tomorrow's date

**Expected Results:**
- ✅ Toast appears within 1-2 seconds
- ✅ Notification type is "event" (different icon/color)
- ✅ Events page refreshes
- ✅ New event visible in events list

**Test Duration:** ~2 minutes

---

### 3.4 Test Notification Panel

**Prerequisites:**
- NotificationBell component integrated in header
- Has received 2+ notifications

**Steps:**
1. Click notification bell icon in header
2. Panel should open showing notifications
3. Click on a notification
4. Watch for mark as read

**Expected Results:**
- ✅ Bell icon shows unread count badge (e.g., "2")
- ✅ Click opens dropdown panel
- ✅ Shows all notifications with titles and times
- ✅ Announcements have blue left border
- ✅ Events have green left border
- ✅ Click notification to mark as read
- ✅ Unread count badge decreases
- ✅ Notification background changes to white

**Test Duration:** ~2 minutes

---

### 3.5 Test Notification Persistence

**Steps:**
1. Close notification panel
2. Refresh the page
3. Open notification panel again

**Expected Results:**
- ✅ Previous notifications still visible
- ✅ Notification count matches before refresh
- ✅ Read/unread status preserved
- ✅ Newest notifications at top

**Test Duration:** ~1 minute

---

### 3.6 Test Auto-Refresh on New Notification

**Steps:**
1. Student viewing announcement list
2. Admin creates new announcement (Window 1)
3. Watch Student page

**Expected Results:**
- ✅ Toast notification appears
- ✅ Announcement list auto-refreshes
- ✅ New announcement appears at top
- ✅ No manual refresh needed

**Test Duration:** ~2 minutes

---

## Test 4: Integration Test (All Features)

### 4.1 Complete User Journey

**Scenario:** New student discovering platform for first time

**Steps:**

1. **Landing Page**
   - [ ] Navigate to `http://localhost:5173`
   - [ ] See welcome information
   - [ ] Click "Sign Up"

2. **Signup**
   - [ ] Fill signup form
   - [ ] Select role as "Student"
   - [ ] Submit

3. **Student Dashboard**
   - [ ] See personalized welcome
   - [ ] View announcements
   - [ ] View upcoming events
   - [ ] See team members

4. **AI Doubt Solver**
   - [ ] Navigate to `/student/ai`
   - [ ] Ask a complex question
   - [ ] See real AI response (or fallback)
   - [ ] Ask follow-up questions
   - [ ] Verify context maintained

5. **Receive Notifications**
   - [ ] Admin creates announcement
   - [ ] Toast appears
   - [ ] Check notification panel
   - [ ] Admin creates event
   - [ ] Toast appears again
   - [ ] Mark notifications as read

6. **Logout**
   - [ ] Click logout
   - [ ] Verify redirected to login
   - [ ] Verify session cleared

**Expected Duration:** ~15-20 minutes

**Success Criteria:**
- All steps complete without errors
- All expected notifications appear
- AI responses are coherent
- No console errors
- Toast notifications work
- Session management works

---

## Test 5: Performance Testing

### 5.1 Login Performance

**Measurement:** Time from clicking Sign In to dashboard visible

**Expected:** < 2 seconds (mock), < 5 seconds (with API)

```javascript
// In console before login:
console.time('login');
// Click sign in
// In console after redirect:
console.timeEnd('login');
```

---

### 5.2 AI Response Time

**Measurement:** Time from submitting question to response appearing

**Expected:**
- Mock: < 2 seconds
- OpenAI: 3-10 seconds
- Cohere: 2-5 seconds

---

### 5.3 Notification Delivery Time

**Measurement:** Time from admin creating announcement to student receiving toast

**Expected:** < 2 seconds (local), < 3 seconds (with API)

---

## Automated Test Cases

### Using Browser DevTools

```javascript
// Test 1: Login redirect
async function testLoginRedirect() {
  const user = JSON.parse(localStorage.getItem('cc_user'));
  console.log('Logged in:', user.name, 'Role:', user.role);
  console.assert(user.role === 'admin', 'Should be admin');
}

// Test 2: Notification count
function testNotificationCount() {
  const toast = document.querySelector('[role="alert"]');
  console.log('Toast visible:', !!toast);
  console.assert(toast, 'Toast should be visible');
}

// Test 3: AI model detection
function testAIModel() {
  const modelIndicator = document.querySelector('[data-testid="ai-model"]');
  console.log('AI Model:', modelIndicator?.textContent);
  console.assert(modelIndicator, 'Should show AI model');
}
```

---

## Troubleshooting During Testing

### Issue: Login fails but mock users exist
- [ ] Clear localStorage: `localStorage.clear()`
- [ ] Clear browser cache: Ctrl+Shift+Delete
- [ ] Check email spelling (case-sensitive server)
- [ ] Check password exactly matches

### Issue: AI not responding
- [ ] Check `.env.local` has correct API key
- [ ] Verify API key format (should start with `sk_`)
- [ ] Check browser console for errors
- [ ] Try with mock mode (remove API key)
- [ ] Check OpenAI/Cohere account has credits

### Issue: Notifications not appearing
- [ ] Check if NotificationBell component is added to header
- [ ] Verify localStorage has `lovable_token` if using Lovable
- [ ] Check browser console for SSE errors
- [ ] Verify firewa doesn't block WebSocket/SSE connections
- [ ] Try hard refresh: Ctrl+Shift+R

### Issue: Session not persisting
- [ ] Check if localStorage is enabled (may be disabled in private mode)
- [ ] Check if cookies are blocked
- [ ] Verify `cc_user` key exists: `localStorage.getItem('cc_user')`
- [ ] Clear and re-login

---

## Success Criteria Checklist

### All Tests Pass ✅

- [ ] Login flow works for all 3 roles
- [ ] Session persists on refresh
- [ ] Role-based routing prevents cross-role access
- [ ] Logout clears session properly
- [ ] AI Doubt Solver responds to questions
- [ ] Real AI integration works (if API key configured)
- [ ] Toast notifications appear for announcements
- [ ] Toast notifications appear for events
- [ ] Notification panel displays correctly
- [ ] Mark as read functionality works
- [ ] Notifications persist across refresh
- [ ] No console errors or warnings
- [ ] All components render correctly
- [ ] Response times within acceptable range
- [ ] Error handling works gracefully

---

## Reporting Issues

If you find issues, document:

1. **Steps to reproduce** - Exact steps taken
2. **Expected behavior** - What should happen
3. **Actual behavior** - What actually happened
4. **Environment:**
   - Browser (Chrome, Firefox, Safari, etc.)
   - OS (Windows, Mac, Linux)
   - Node version: `node --version`
   - npm version: `npm --version`
5. **Console errors** - Copy full error message
6. **Screenshots/Videos** - Visual evidence

---

**Testing Status:** Ready
**Last Updated:** March 26, 2026
**Required Time:** 30-60 minutes for complete testing
