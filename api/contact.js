import nodemailer from 'nodemailer';

// This is a Vercel serverless function
export default async function handler(req, res) {
// Set CORS headers
res.setHeader('Access-Control-Allow-Credentials', true);
res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
res.setHeader(
'Access-Control-Allow-Headers',
'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
);

// Handle preflight requests
if (req.method === 'OPTIONS') {
res.status(200).end();
return;
}

// Only allow POST requests
if (req.method !== 'POST') {
return res.status(405).json({ success: false, error: 'Method not allowed' });
}

try {
const { name, email, subject, message } = req.body;


// Validation
if (!name || !email || !message) {
  return res.status(400).json({
    success: false,
    error: 'Name, email, and message are required fields.'
  });
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({
    success: false,
    error: 'Please provide a valid email address.'
  });
}

// Length validation
if (name.length > 100 || email.length > 100 || message.length > 2000) {
  return res.status(400).json({
    success: false,
    error: 'Input fields are too long.'
  });
}

    // Create nodemailer transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
              feel free to reach out to me directly at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #4F46E5;">${process.env.ADMIN_EMAIL}</a>.
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
}