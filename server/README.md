# Portfolio Backend Server

This is the backend server for the portfolio contact form functionality using Node.js, Express, and Nodemailer.

## Features

- ✅ Send emails using Nodemailer with Gmail
- ✅ Auto-reply to contact form submissions
- ✅ Rate limiting (5 requests per 15 minutes)
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ Professional HTML email templates
- ✅ Error handling and logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Gmail credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ADMIN_EMAIL=your-email@gmail.com
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

### 3. Gmail App Password Setup

**Important:** You need to use a Gmail App Password, not your regular Gmail password.

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** > **2-Step Verification** (enable if not already enabled)
3. Go to **Security** > **App passwords**
4. Generate a new app password for "Mail"
5. Use this 16-character app password in your `.env` file

### 4. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST `/api/contact`

Sends an email from the contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! You should receive a confirmation email shortly."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2023-10-30T12:00:00.000Z"
}
```

## Security Features

- **Rate Limiting:** 5 requests per 15 minutes per IP address
- **Input Validation:** Validates email format and field lengths
- **CORS Protection:** Only allows requests from specified frontend URL
- **Security Headers:** Uses Helmet.js for security headers
- **Error Handling:** Comprehensive error handling with logging

## Email Templates

The server sends two types of emails:

1. **Admin Notification:** Sent to you when someone fills the contact form
2. **Auto-reply:** Sent to the person who filled the form as confirmation

Both emails use professional HTML templates with your branding.

## Deployment

For production deployment:

1. Set `FRONTEND_URL` to your deployed frontend URL (e.g., `https://sreenandhm.vercel.app`)
2. Deploy to platforms like Heroku, Railway, or Vercel
3. Update your frontend to use the deployed backend URL

## Troubleshooting

**Gmail Authentication Issues:**
- Ensure 2-Step Verification is enabled
- Use App Password, not regular password
- Check that "Less secure app access" is not needed (App Passwords bypass this)

**CORS Issues:**
- Verify `FRONTEND_URL` in `.env` matches your frontend URL exactly
- For development, use `http://localhost:5173` or your dev server URL

**Rate Limiting:**
- If you hit the rate limit, wait 15 minutes or restart the server
- Adjust the rate limit in `server.js` if needed for development

## Contact

For any issues or questions, contact Sreenandh M at sreenandhnandhu123@gmail.com