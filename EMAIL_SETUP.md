# Email Setup Guide for Portfolio Contact Form

This guide will help you set up the email functionality for your portfolio contact form using Nodemailer and Gmail.

## 🎆 Overview

Your portfolio now has a fully functional contact form that:
- ✅ Sends emails using Nodemailer with Gmail SMTP
- ✅ Sends you a notification when someone contacts you
- ✅ Sends an auto-reply confirmation to the person who contacted you
- ✅ Has professional HTML email templates
- ✅ Includes rate limiting and security features
- ✅ Validates input and handles errors gracefully

## 🚀 Quick Setup (5 minutes)

### Step 1: Backend Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your Gmail credentials in `.env`:**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ADMIN_EMAIL=your-email@gmail.com
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

### Step 2: Gmail App Password Setup

🔑 **Important:** You must use a Gmail App Password, not your regular password.

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **Security** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password to your `.env` file

### Step 3: Frontend Setup

1. **In the root directory, create `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Configure the API URL in `.env`:**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

### Step 4: Start Both Servers

1. **Start the backend (in `server/` directory):**
   ```bash
   npm run dev
   ```

2. **Start the frontend (in root directory):**
   ```bash
   npm run dev
   ```

### Step 5: Test the Contact Form

1. Open your portfolio at `http://localhost:5173`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email for the notification and auto-reply

## 📚 Email Templates

### Admin Notification Email
When someone contacts you, you'll receive a professional email with:
- Contact person's details (name, email)
- Subject and message content
- Timestamp
- Clean, branded HTML layout

### Auto-Reply Email
The person who contacts you will receive:
- Confirmation that their message was received
- Copy of their original message
- Your contact information
- Links to your social profiles
- Professional branding

## 🔒 Security Features

- **Rate Limiting:** 5 requests per 15 minutes per IP
- **Input Validation:** Email validation and field length limits
- **CORS Protection:** Only allows requests from your frontend
- **Security Headers:** Helmet.js for additional security
- **Error Handling:** Comprehensive error handling with user-friendly messages

## 🌐 Production Deployment

### Backend Deployment Options:
1. **Heroku** (Free tier available)
2. **Railway** (Great for Node.js apps)
3. **Vercel** (Good for serverless functions)
4. **DigitalOcean App Platform**

### Frontend Environment Variable:
Update your frontend `.env` with your deployed backend URL:
```env
VITE_API_URL=https://your-backend-domain.com
```

### Backend Environment Variable:
Update your backend `.env` with your deployed frontend URL:
```env
FRONTEND_URL=https://sreenandhm.vercel.app
```

## 🔧 Troubleshooting

### Common Issues:

**❌ Gmail Authentication Failed**
- Ensure 2-Step Verification is enabled
- Use App Password, not regular Gmail password
- Double-check the App Password (16 characters, no spaces)

**❌ CORS Error**
- Verify `FRONTEND_URL` in server `.env` matches your frontend URL exactly
- For development: `http://localhost:5173`
- For production: your deployed domain

**❌ "Network Error" in Frontend**
- Check if backend server is running on port 3001
- Verify `VITE_API_URL` in frontend `.env`
- Check browser console for detailed error messages

**❌ Rate Limit Hit**
- Wait 15 minutes or restart the backend server
- For testing, you can temporarily increase the limit in `server.js`

### Testing the Backend Directly:

You can test the backend API using curl:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Health Check:
Visit `http://localhost:3001/api/health` to verify the server is running.

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the server logs for error messages
3. Ensure all environment variables are correctly set
4. Verify your Gmail App Password is working

For additional help, contact Sreenandh M at sreenandhnandhu123@gmail.com

---

🎉 **Congratulations!** Your portfolio now has a professional contact form with email functionality!