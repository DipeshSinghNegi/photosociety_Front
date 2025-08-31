# Photo Society Setup Guide

## Environment Configuration

This application has a frontend (Next.js) and backend (Express + Socket.io). The frontend communicates with the backend for uploads and real-time photo display.

### 1. Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

### 2. Configure Backend URL

Edit `.env.local` and set your backend URL:

```bash
# For hosted backend (replace with your actual domain)
NEXT_PUBLIC_API_BASE=https://your-backend-domain.com

# For local development
# NEXT_PUBLIC_API_BASE=http://localhost:5001
```

### 3. Backend Setup

Make sure your backend (`server.js`) is running and accessible at the URL you specified in `NEXT_PUBLIC_API_BASE`.

The backend provides these endpoints:
- `POST /upload` - Upload photos
- `GET /display_pic` - Get current display photo
- `GET /uploads/*` - Serve uploaded files
- Socket.io for real-time updates

### 4. Frontend Setup

The frontend is now configured to only communicate with the backend:

- **Upload page** (`/upload`) - Posts to `${NEXT_PUBLIC_API_BASE}/upload`
- **Display page** (`/main`) - Fetches from `${NEXT_PUBLIC_API_BASE}/display_pic` and listens for socket events

### 5. Start the Application

```bash
# Install dependencies
npm install

# Start the frontend (Next.js)
npm run dev

# Start the backend (in a separate terminal)
node server.js
```

## Architecture

- **Frontend**: Next.js app with upload and display pages
- **Backend**: Express server with Socket.io for real-time communication
- **Storage**: Local file system (uploads directory)
- **Real-time**: Socket.io events for instant photo updates

The duplicate Next.js API routes have been removed to ensure all communication goes through the backend.
