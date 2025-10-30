import express from 'express';
import { createTransporter } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting - 5 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to contact route
app.use('/api/contact', limiter);

// Create nodemailer transporter
const createEmailTransporter = () => {
  return createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password for Gmail
    },
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (name.length > 100 || email.length > 100 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Input fields are too long.'
      });
    }

    const transporter = createEmailTransporter();

    // Email to yourself (notification)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || 'New Contact Form Submission'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #4F46E5; margin-bottom: 5px;">Contact Details:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #4F46E5; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 5px;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">This email was sent from your portfolio contact form</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">Sent at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    };

    // Auto-reply to the sender
    const replyMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">Thank You for Your Message!</h2>
            
            <p style="color: #333; line-height: 1.6;">Hi ${name},</p>
            
            <p style="color: #333; line-height: 1.6;">
              Thank you for reaching out through my portfolio! I've received your message and I appreciate you taking the time to contact me.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #4F46E5;">Your message:</p>
              <p style="margin: 10px 0 0 0; color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #333; line-height: 1.6;">
              I'll review your message and get back to you as soon as possible. If your inquiry is urgent, 
              feel free to reach out to me directly at <a href="mailto:${process.env.EMAIL_USER}" style="color: #4F46E5;">${process.env.EMAIL_USER}</a>.
            </p>
            
            <p style="color: #333; line-height: 1.6;">Best regards,<br><strong>Sreenandh M</strong></p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">This is an automated response from sreenandh's portfolio</p>
              <p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">
                Connect with me: 
                <a href="https://github.com/sreenandh" style="color: #4F46E5; text-decoration: none; margin: 0 5px;">GitHub</a> |
                <a href="https://www.linkedin.com/in/sreenandh-m/" style="color: #4F46E5; text-decoration: none; margin: 0 5px;">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(replyMailOptions)
    ]);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly.'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later or contact me directly.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});