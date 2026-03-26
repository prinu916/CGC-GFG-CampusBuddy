# Real-Time Notification System Implementation

This guide covers the complete real-time notification system implementation with toast alerts, notification panel, and backend integration.

## Architecture Overview

```
┌─────────────────┐
│   Admin Panel    │
│ (Create Announce)│
└────────┬────────┘
         │ POST /announcements
         ↓
┌─────────────────┐
│   Backend API    │
│  (Lovable Cloud) │
└────────┬────────┘
         │ Broadcast Event
         ↓
┌─────────────────┐
│  Event Stream   │
│  (WebSocket or  │
│   SSE)          │
└────────┬────────┘
         │ Real-time Message
         ↓
┌──────────────────────────────┐
│  notification-service.ts      │
│  - Parse events               │
│  - Update state               │
│  - Trigger hooks              │
└────────┬─────────┬───────────┘
         │         │
         ↓         ↓
    ┌─────────────────┐    ┌──────────────────┐
    │  Toast Notifs   │    │ NotificationBell │
    │  (Automatic)    │    │  (Dropdown Panel)│
    └─────────────────┘    └──────────────────┘
```

## Components

### 1. Notification Service (`src/lib/notification-service.ts`)

Main service for handling real-time notifications.

**Features:**
- Server-Sent Events (SSE) listener
- Subscribe/unsubscribe pattern
- Real-time updates for announcements and events
- Mark as read functionality
- Toast notification integration

**Key Methods:**
```typescript
notificationService.initializeRealtimeListener(userId, token)
// Starts listening for real-time notifications

notificationService.subscribe('announcement', callback)
// Subscribe to announcement updates

notificationService.createNotification(userId, notification)
// Create a notification programmatically

notificationService.markAsRead(notificationId)
// Mark notification as read
```

### 2. Notification Hook (`src/hooks/use-notifications.ts`)

React hook for using notifications in components.

```typescript
const { notifications, unreadCount, markAsRead, clearNotifications } = useNotifications(userId);
```

**Returns:**
- `notifications`: Array of Notification objects
- `unreadCount`: Number of unread notifications
- `markAsRead(id)`: Function to mark notification as read
- `clearNotifications()`: Clear all notifications

### 3. Notification Bell Component (`src/components/NotificationBell.tsx`)

Pre-built notification panel with dropdown UI.

**Features:**
- Shows notification count badge
- Dropdown panel with notification list
- Color-coded by type (announcement, event, error, etc.)
- Click to mark as read
- Timestamp display

**Usage:**
```typescript
import NotificationBell from '@/components/NotificationBell';

export function Header() {
  return (
    <header>
      <h1>Dashboard</h1>
      <NotificationBell className="ml-auto" />
    </header>
  );
}
```

## Setup Instructions

### Step 1: Integrate into Dashboard Layout

Add NotificationBell to your header/navbar:

**File:** `src/components/DashboardLayout.tsx`

```typescript
import NotificationBell from '@/components/NotificationBell';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="flex items-center justify-between p-4">
        <h1>Dashboard</h1>
        <NotificationBell />
      </header>
      <main>{children}</main>
    </div>
  );
}
```

### Step 2: Initialize Notifications in AuthContext

The updated AuthContext already initializes the notification service:

```typescript
// src/context/AuthContext-Lovable.tsx
useEffect(() => {
  if (user && isLovableEnabled) {
    const token = localStorage.getItem('lovable_token');
    if (token) {
      notificationService.initializeRealtimeListener(user.id, token);
    }
  }
}, [user, isLovableEnabled]);
```

### Step 3: Create Custom Notification Components (Optional)

```typescript
// src/components/NotificationPage.tsx
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/hooks/use-notifications';

export function NotificationPage() {
  const { user } = useAuth();
  const { notifications, markAsRead } = useNotifications(user?.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      
      <div className="space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.isRead
                ? 'bg-gray-50 border-gray-200'
                : 'bg-blue-50 border-blue-200'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <h3 className="font-semibold">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Backend API Endpoints Required

### 1. Create Notification

```
POST /api/notifications
Authorization: Bearer {token}

{
  "userId": "user-id",
  "title": "New Announcement",
  "message": "Check out the latest announcement",
  "type": "announcement",
  "relatedId": "announcement-id",
  "relatedType": "announcement"
}

Response: { id, userId, title, message, type, isRead, createdAt }
```

### 2. Get Notifications

```
GET /api/notifications?userId={userId}&limit=20
Authorization: Bearer {token}

Response: [{ id, userId, title, message, type, isRead, createdAt }, ...]
```

### 3. Mark as Read

```
PATCH /api/notifications/{id}/read
Authorization: Bearer {token}

Response: { success: true }
```

### 4. Real-time Stream (SSE)

```
GET /api/notifications/stream?userId={userId}&token={token}

Events:
- "notification": New notification
- "announcement": New announcement
- "event": New event

Event data: { id, userId, title, message, type, isRead, createdAt }
```

### 5. Broadcast Notification

```
POST /api/notifications/broadcast
Authorization: Bearer {token}

{
  "userIds": ["user1", "user2"],
  "title": "New Announcement",
  "message": "Important update",
  "type": "announcement",
  "relatedId": "announcement-id",
  "relatedType": "announcement"
}

Response: { success: true, sentTo: 2 }
```

## Integration with Announcements

### Auto-Notify on New Announcement

**File:** `src/pages/admin/AdminAnnouncements.tsx`

```typescript
import { notificationService } from '@/lib/notification-service';

async function handleCreateAnnouncement(announcement: Announcement) {
  // 1. Create announcement in database
  const created = await createAnnouncement(announcement);
  
  // 2. Get all users to notify
  const allUsers = await fetchAllUsers();
  const userIds = allUsers.map(u => u.id);
  
  // 3. Broadcast notification
  await notificationService.notifyOnAnnouncement(created, userIds);
  
  // 4. Show success toast
  toast({
    title: 'Announcement created',
    description: `Notified ${userIds.length} users`
  });
}
```

## Testing Notifications

### Manual Test in Console

```javascript
// Simulate receiving a notification
window.dispatchEvent(new CustomEvent('show-toast', {
  detail: {
    title: 'Test Announcement',
    description: 'This is a test notification',
    variant: 'default'
  }
}));

// Simulate getting notification data
fetch('/api/notifications?userId=user123', {
  headers: { 'Authorization': 'Bearer token' }
})
  .then(r => r.json())
  .then(notifications => console.log(notifications));
```

### Test Cases

| Test | Steps | Expected |
|------|-------|----------|
| Toast on new announcement | Create announcement as admin | Toast appears on all dashboards |
| Toast on new event | Create event as admin | Toast appears on all dashboards |
| Unread count | Open notifications panel | Shows correct unread count |
| Mark as read | Click notification in panel | Count decreases, notification marked read |
| Real-time delivery | Create announcement | Appears instantly without refresh |
| Persistence | Refresh page | Notifications still there |
| Multiple types | Mix of announcements/events/errors | Each shows correct icon |

## Customization

### Change Toast Position

```typescript
// src/components/ui/toaster.tsx
<Toaster
  position="top-right"  // or "top-left", "bottom-right", etc.
  duration={3000}
  closeButton
/>
```

### Change Notification Panel Colors

Edit `src/components/NotificationBell.tsx`:

```typescript
const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'announcement':
      return 'border-l-4 border-purple-500';  // Change color
    // ...
  }
};
```

### Add Email Notifications

```typescript
// Extend notification-service.ts
async function sendEmailNotification(
  userEmail: string,
  notification: Notification
) {
  await fetch('/api/emails/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: userEmail,
      subject: notification.title,
      body: notification.message
    })
  });
}
```

### Add SMS Notifications

```typescript
// Extend notification-service.ts
async function sendSMSNotification(
  phoneNumber: string,
  notification: Notification
) {
  await fetch('/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: phoneNumber,
      message: `${notification.title}: ${notification.message}`
    })
  });
}
```

## Troubleshooting

### Notifications Not Appearing

1. Check browser console for errors
2. Verify token is in localStorage: `localStorage.getItem('lovable_token')`
3. Check network tab for failed requests
4. Verify `/api/notifications/stream` endpoint exists

### Hook Not Working

```typescript
// ❌ Wrong - hook called outside component
const notifications = useNotifications(userId);

export function MyComponent() {}

// ✅ Correct - hook called inside component
export function MyComponent() {
  const notifications = useNotifications(userId);
}
```

### Real-time Not Updating

1. Verify EventSource connection in DevTools
2. Check `network` tab for SSE updates
3. Verify backend is sending events
4. Check firewall/proxy not blocking WebSocket

### Unread Count Not Updating

1. Verify `markAsRead` is being called
2. Check localStorage for token
3. Verify API endpoint `/api/notifications/{id}/read` returns success
4. Refresh page if needed (UI updates on next interaction)

## Performance Optimization

### Limit Notification History

```typescript
// Keep only last 50 notifications
const MAX_NOTIFICATIONS = 50;

if (notifications.length > MAX_NOTIFICATIONS) {
  notifications = notifications.slice(0, MAX_NOTIFICATIONS);
}
```

### Pagination for Large Lists

```typescript
const [page, setPage] = useState(1);
const pageSize = 20;

const paginatedNotifications = notifications.slice(
  (page - 1) * pageSize,
  page * pageSize
);
```

### Auto-dismiss Notifications

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    closeNotifier();
  }, 5000); // Auto close after 5 seconds

  return () => clearTimeout(timer);
}, []);
```

## Production Checklist

- [ ] SSE/WebSocket URL configured in production
- [ ] Backend API endpoints implemented
- [ ] Database schema for notifications created
- [ ] Test notifications broadcast to multiple users
- [ ] Monitor notification queue size
- [ ] Set up notification retention policy
- [ ] Add notification rate limiting
- [ ] Implement notification analytics
- [ ] Add notification preferences (user opt-in/out)
- [ ] Set up email fallback for missed notifications

---

**Status:** Complete Implementation Ready
**Last Updated:** March 26, 2026
