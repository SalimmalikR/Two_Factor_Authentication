const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salimnovastrid@gmail.com',
        pass: 'rvpaehsvdvvnsvha'
    }
});

const sendOTPByEmail = async (email, generatedOTP) => {
    try {
        const htmlContent = `
        <html>
        <head>
          <title>OTP Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              color: #333;
            }
        
            h1 {
              color: #007bff;
            }
        
            .container {
              max-width: 400px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              background-color: #fff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
        
            .otp {
              font-size: 24px;
              color: #28a745;
              text-align: center;
              margin-bottom: 30px;
            }
        
            .instructions {
              text-align: center;
              margin-bottom: 20px;
            }
        
            .footer {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>OTP Verification</h1>
            <p class="otp">Your OTP for login: <strong>${generatedOTP}</strong></p>
            <p class="instructions">Please enter the above OTP to proceed with the login process.</p>
            <div class="footer">
              <p>Need help? Contact support at support@example.com</p>
            </div>
          </div>
        </body>
        </html>
    `;
        await transporter.sendMail({
            from: 'salimnovastrid@gmail.com',
            to: email,
            subject: 'OTP Verification',
            html: htmlContent
        });

        return sendOTPByEmail;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error(error.message);
    }
};

module.exports = {
    sendOTPByEmail
};
