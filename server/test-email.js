import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Testing Gmail credentials...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'NOT SET');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

async function testEmail() {
  try {
    console.log('\nCreating transporter...');
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('✅ Gmail authentication successful!');

    console.log('\nSending test email...');
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from Portfolio Backend',
      text: 'If you receive this email, your Gmail setup is working correctly!',
      html: '<h2>✅ Success!</h2><p>Your Gmail configuration is working correctly.</p>'
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('\n🎉 Everything is working! Your contact form should work now.');

  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 Fix: You need a Gmail App Password!');
      console.log('1. Go to https://myaccount.google.com');
      console.log('2. Security → 2-Step Verification (enable)');
      console.log('3. Security → App passwords → Mail');
      console.log('4. Copy the 16-character password to your .env file');
    }
    
    if (error.message.includes('Username and Password not accepted')) {
      console.log('\n🔧 Fix: Check your Gmail credentials!');
      console.log('- EMAIL_USER must be a valid Gmail address');
      console.log('- EMAIL_PASS must be a 16-character App Password');
    }
  }
}

testEmail();