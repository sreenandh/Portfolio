# 🚀 Vercel Deployment Guide for Portfolio with Email

## 📧 **Email Configuration Explanation**

Your `.env` file should look like this:

```env
EMAIL_USER=sreenandhnandhu123@gmail.com     # Your Gmail (SENDS emails)
EMAIL_PASS=your-16-character-app-password   # Gmail App Password
ADMIN_EMAIL=sreenandhnandhu123@gmail.com   # Where notifications go (RECEIVES emails)
```

### **Who sends/receives what:**
- **EMAIL_USER** 📤 = Your Gmail account that **SENDS** both notification and auto-reply emails
- **ADMIN_EMAIL** 📥 = Email address that **RECEIVES** contact notifications (usually same as EMAIL_USER)
- **EMAIL_PASS** 🔑 = App Password for the EMAIL_USER Gmail account

**Most common setup:** Use the **same Gmail** for both EMAIL_USER and ADMIN_EMAIL.

## 🔐 **Repository Privacy**

### **Should you make it private?**

**✅ RECOMMENDED: Keep it PUBLIC** for these reasons:
- Shows your work to potential employers
- Demonstrates your coding skills
- Allows others to learn from your implementation
- GitHub Pages/Vercel work great with public repos

**🔒 Your sensitive data is SAFE because:**
- `.env` files are in `.gitignore` (never uploaded to GitHub)
- Environment variables are stored securely in Vercel
- Email passwords are never exposed in code

**Only make it private if:**
- You have proprietary business logic
- Client specifically requires privacy
- You include sensitive business information

## 🚀 **Vercel Deployment Steps**

### **Step 1: Prepare Your Repository**

1. **Ensure all files are committed:**
   ```bash
   git add .
   git commit -m "Add email functionality"
   git push origin main
   ```

### **Step 2: Deploy to Vercel**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: **Vite**
   - Root Directory: **/** (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `dist`

### **Step 3: Add Environment Variables in Vercel**

1. **In your Vercel project dashboard:**
   - Go to **Settings** → **Environment Variables**
   - Add these variables:

   ```
   EMAIL_USER = sreenandhnandhu123@gmail.com
   EMAIL_PASS = your-16-character-app-password
   ADMIN_EMAIL = sreenandhnandhu123@gmail.com
   ```

2. **Important:** Set environment for **All Environments** (Production, Preview, Development)

### **Step 4: Gmail App Password Setup**

1. **Go to [Google Account Settings](https://myaccount.google.com/)**
2. **Security** → **2-Step Verification** (enable if not already)
3. **Security** → **App passwords**
4. **Generate app password for "Mail"**
5. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
6. **Add it to Vercel environment variables** (without spaces: `abcdefghijklmnop`)

### **Step 5: Deploy**

1. **Click "Deploy"** in Vercel
2. **Wait for deployment to complete**
3. **Your site will be available at:** `https://your-project-name.vercel.app`

## ✅ **Testing Your Deployment**

1. **Visit your deployed site**
2. **Navigate to the contact section**
3. **Fill out the contact form**
4. **Submit the form**
5. **Check your Gmail for:**
   - Notification email (to you)
   - Auto-reply email (to the test email you used)

## 🐛 **Troubleshooting**

### **Common Issues:**

**❌ "Network Error" when submitting form:**
- Check Vercel function logs in dashboard
- Verify environment variables are set correctly
- Ensure Gmail App Password is correct (16 characters, no spaces)

**❌ "Gmail Authentication Failed":**
- Double-check Gmail App Password
- Ensure 2-Step Verification is enabled
- Try generating a new App Password

**❌ "CORS Error":**
- The serverless function handles CORS automatically
- If issues persist, check browser console for details

**❌ Emails not sending:**
- Check Vercel function logs for detailed error messages
- Verify EMAIL_USER and ADMIN_EMAIL are valid Gmail addresses
- Test Gmail credentials manually

### **Vercel Function Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click on "Functions" tab
3. Click on `/api/contact`
4. View logs for debugging

## 📱 **Production URLs**

After deployment:
- **Frontend:** `https://your-portfolio.vercel.app`
- **Contact API:** `https://your-portfolio.vercel.app/api/contact`

## 🔄 **Updating Your Site**

To update your portfolio:
1. **Make changes locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
3. **Vercel automatically redeploys** from GitHub

## 🎉 **You're Done!**

Your portfolio now has:
- ✅ Professional contact form
- ✅ Email notifications when someone contacts you
- ✅ Auto-reply confirmations
- ✅ Secure, serverless backend
- ✅ Beautiful, responsive design
- ✅ Production-ready deployment

**Test it out and start receiving inquiries! 🚀**