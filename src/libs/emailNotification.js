import nodemailer from 'nodemailer';

// Function to send email notification when an appointment is found
export const sendAppointmentNotification = async (appointmentDate, location) => {
  try {
    // Get the recipient email from environment variable or config
    const recipientEmail = process.env.NOTIFICATION_EMAIL;
    
    // If no recipient email is set, skip sending notification
    if (!recipientEmail) {
      console.log('No notification email set. Skipping email notification.');
      return false;
    }
    
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    // Format the date for better readability
    const formattedDate = new Date(appointmentDate).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: '🎉 ICBC Appointment Found!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #4CAF50; text-align: center;">ICBC Appointment Found!</h2>
          <p style="font-size: 16px;">Great news! The ICBC appointment bot has found an available appointment:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date and Time:</strong> ${formattedDate}</p>
            <p><strong>Location:</strong> ${location}</p>
          </div>
          <p style="font-size: 16px;">The bot is attempting to book this appointment for you. You may need to provide a verification code.</p>
          <p style="color: #777; font-size: 14px; margin-top: 30px;">This is an automated message from your ICBC Appointment Bot.</p>
        </div>
      `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}; 