# Lovable Cloud Integration Guide

Lovable is a platform that enables AI-powered full-stack development. This guide covers integrating Lovable Cloud for real authentication, database persistence, and file storage.

## Prerequisites

- Lovable account (https://www.lovable.dev)
- Project already created in Lovable Dashboard
- Node.js 18+ installed locally
- npm or bun package manager

## Step 1: Enable Lovable Cloud Services

### 1.1 Connect to Lovable Cloud
1. Log in to https://www.lovable.dev/dashboard
2. Select your CGC-GFG project
3. In project settings, enable:
   - ✅ Database (PostgreSQL)
   - ✅ Authentication
   - ✅ File Storage
   - ✅ Real-time WebSocket connections

### 1.2 Get API Keys and Connection Strings

From Lovable Dashboard → Settings:

```
LOVABLE_API_KEY=your_api_key_here
LOVABLE_PROJECT_ID=your_project_id_here
LOVABLE_DATABASE_URL=postgresql://user:password@host:port/database
LOVABLE_STORAGE_BUCKET=your-storage-bucket-name
LOVABLE_JWT_SECRET=your_jwt_secret_here
LOVABLE_REALTIME_URL=wss://realtime.lovable.dev/project_id
LOVABLE_AUTH_URL=https://auth.lovable.dev
LOVABLE_FILE_UPLOAD_ENDPOINT=https://files.lovable.dev/upload
```

## Step 2: Update Environment Configuration

### 2.1 Create `.env.local`

In the project root (`CGC-GFG/CGC-GFG/`), create `.env.local`:

```env
# Lovable Cloud Configuration
VITE_LOVABLE_API_KEY=sk_live_your_api_key
VITE_LOVABLE_PROJECT_ID=proj_your_project_id
VITE_LOVABLE_AUTH_URL=https://auth.lovable.dev
VITE_LOVABLE_DATABASE_URL=postgresql://user:password@host:5432/cgc_gfg
VITE_LOVABLE_REALTIME_URL=wss://realtime.lovable.dev/socket
VITE_LOVABLE_STORAGE_BUCKET=cgc-gfg-storage
VITE_LOVABLE_AI_API_KEY=sk_test_your_ai_api_key

# Optional: If using external AI providers
VITE_OPENAI_API_KEY=sk_test_openai_key (for GPT models)
VITE_COHERE_API_KEY=your_cohere_key (for alternative AI)
```

### 2.2 Update Backend `.env` (in `backend-setup/`)

```env
LOVABLE_API_KEY=sk_live_your_api_key
LOVABLE_DATABASE_URL=postgresql://user:password@host:5432/cgc_gfg
LOVABLE_JWT_SECRET=your_jwt_secret_key
LOVABLE_REALTIME_ENABLED=true
NODE_ENV=production
```

## Step 3: Install Lovable SDK

```bash
npm install @lovable/sdk @lovable/realtime firebase-admin
# or
bun add @lovable/sdk @lovable/realtime firebase-admin
```

## Step 4: Database Schema Setup

### 4.1 Migrations for Authentication

Create migration files in `backend-setup/migrations/`:

**001_create_users_table.sql**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'team', 'student')),
  branch VARCHAR(100),
  skills JSONB DEFAULT '[]',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

**002_create_announcements_table.sql**
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_roles VARCHAR(50)[] DEFAULT '{admin,team,student}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_announcements_author ON announcements(author_id);
CREATE INDEX idx_announcements_created ON announcements(created_at);
```

**003_create_events_table.sql**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date_time TIMESTAMP NOT NULL,
  location VARCHAR(255),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  registered_users UUID[] DEFAULT '{}',
  capacity INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(date_time);
CREATE INDEX idx_events_creator ON events(creator_id);
```

**004_create_notifications_table.sql**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'announcement', 'event')),
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  related_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
```

### 4.2 Run Migrations

```bash
# Using Lovable CLI
lovable db:migrate

# Or manually:
psql $LOVABLE_DATABASE_URL < backend-setup/migrations/001_create_users_table.sql
psql $LOVABLE_DATABASE_URL < backend-setup/migrations/002_create_announcements_table.sql
# ... etc
```

## Step 5: Implement Lovable Authentication Service

Create `src/lib/lovable-auth.ts`:

```typescript
import { LovableClient } from '@lovable/sdk';

const lovableClient = new LovableClient({
  apiKey: import.meta.env.VITE_LOVABLE_API_KEY,
  projectId: import.meta.env.VITE_LOVABLE_PROJECT_ID,
  authUrl: import.meta.env.VITE_LOVABLE_AUTH_URL,
});

export async function loginWithLovable(email: string, password: string) {
  try {
    const response = await lovableClient.auth.signIn({
      email,
      password,
      provider: 'email'
    });
    
    if (!response.user) throw new Error('Login failed');
    
    // Store JWT token
    localStorage.setItem('lovable_token', response.session.accessToken);
    
    // Fetch user role and additional data
    const userData = await lovableClient.query('SELECT * FROM users WHERE id = $1', [response.user.id]);
    
    return {
      user: response.user,
      userData: userData[0],
      token: response.session.accessToken
    };
  } catch (error) {
    console.error('Lovable login error:', error);
    throw error;
  }
}

export async function signupWithLovable(name: string, email: string, password: string, role: 'admin' | 'team' | 'student' = 'student') {
  try {
    const response = await lovableClient.auth.signUp({
      email,
      password,
      metadata: { name, role }
    });
    
    // Fallback: Create user record in database if auth signup succeeds
    await lovableClient.query(
      `INSERT INTO users (id, email, name, role) VALUES ($1, $2, $3, $4)`,
      [response.user.id, email, name, role]
    );
    
    localStorage.setItem('lovable_token', response.session.accessToken);
    
    return {
      user: response.user,
      role,
      token: response.session.accessToken
    };
  } catch (error) {
    console.error('Lovable signup error:', error);
    throw error;
  }
}

export async function logoutWithLovable() {
  try {
    await lovableClient.auth.signOut();
    localStorage.removeItem('lovable_token');
  } catch (error) {
    console.error('Lovable logout error:', error);
    throw error;
  }
}

export function getLovableClient() {
  return lovableClient;
}

export function getLovableToken() {
  return localStorage.getItem('lovable_token');
}
```

## Step 6: Implement Real-time Notifications

Create `src/lib/lovable-realtime.ts`:

```typescript
import { RealtimeClient } from '@lovable/realtime';

let realtimeClient: RealtimeClient | null = null;

export function initRealtimeConnection(userId: string, token: string) {
  realtimeClient = new RealtimeClient({
    url: import.meta.env.VITE_LOVABLE_REALTIME_URL,
    token,
    projectId: import.meta.env.VITE_LOVABLE_PROJECT_ID
  });

  realtimeClient.on('connected', () => {
    console.log('Real-time connection established');
    // Subscribe to notifications for this user
    realtimeClient?.subscribe(`notifications:${userId}`, (data) => {
      handleNewNotification(data);
    });
  });

  realtimeClient.connect();
}

export function subscribeToNotifications(userId: string, callback: (notification: any) => void) {
  if (realtimeClient) {
    realtimeClient.subscribe(`notifications:${userId}`, callback);
  }
}

export function subscribeToAnnouncements(callback: (announcement: any) => void) {
  if (realtimeClient) {
    realtimeClient.subscribe('announcements:new', callback);
  }
}

export function subscribeToEvents(callback: (event: any) => void) {
  if (realtimeClient) {
    realtimeClient.subscribe('events:new', callback);
  }
}

function handleNewNotification(notification: any) {
  // Dispatch event for React to listen
  window.dispatchEvent(new CustomEvent('notification', { detail: notification }));
}

export function disconnectRealtime() {
  if (realtimeClient) {
    realtimeClient.disconnect();
  }
}
```

## Step 7: File Storage Configuration

Create `src/lib/lovable-storage.ts`:

```typescript
import axios from 'axios';

export async function uploadFile(file: File, path: string = 'uploads'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);
  
  try {
    const response = await axios.post(
      import.meta.env.VITE_LOVABLE_FILE_UPLOAD_ENDPOINT,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('lovable_token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data.url;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    await axios.delete(import.meta.env.VITE_LOVABLE_FILE_UPLOAD_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('lovable_token')}`
      },
      data: { url: fileUrl }
    });
  } catch (error) {
    console.error('File deletion error:', error);
    throw error;
  }
}
```

## Step 8: Deployment

### 8.1 Deploy to Lovable Cloud

```bash
# Build the project
npm run build

# Deploy to Lovable Cloud
lovable deploy --project=cgc-gfg
```

### 8.2 Environment Variables in Lovable Dashboard

Set all `.env` variables in Lovable Dashboard → Project Settings → Environment Variables

## Step 9: Testing Lovable Integration

1. **Test Authentication:**
   - Login with email/password → Should connect to Lovable DB
   - Signup new user → Should store in Lovable DB
   - Logout → Should clear Lovable token

2. **Test Real-time:**
   - Create announcement → Should broadcast to all users
   - Create event → Should trigger notifications
   - Subscribe users → Should receive updates in real-time

3. **Test File Storage:**
   - Upload avatar image → Should store in Lovable storage
   - Delete image → Should remove from storage

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $LOVABLE_DATABASE_URL
```

### Authentication Fails
- Verify API key is correct
- Check JWT secret is configured
- Ensure user exists in database

### Real-time Not Working
- Check WebSocket URL is correct
- Verify token is valid
- Check browser console for connection errors

## Additional Resources

- [Lovable Documentation](https://docs.lovable.dev)
- [Lovable SDK Reference](https://sdk.lovable.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Real-time Best Practices](https://docs.lovable.dev/realtime)
