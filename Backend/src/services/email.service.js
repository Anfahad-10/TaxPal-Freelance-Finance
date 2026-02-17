const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Taxpal Finance" <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


async function sendRegistrationEmail(userEmail, name) {
    const subject = "Verified: Your Taxpal Finance account is Active 💎";
    const text = `Hello ${name}, Welcome to Taxpal Finance. Your account is ready. \n Your journey to smarter wealth management starts here.`;
    const html = `
            <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Base Styles */
        body { 
          margin: 0; 
          padding: 0; 
          background: #0f172a; /* Deep Navy Background */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Full Background Wrapper */
        .wrapper {
          width: 100%;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          padding: 40px 0;
        }

        /* The Main Glass-Style Card */
        .card {
          max-width: 540px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3); /* Deep shadow for premium feel */
        }

        /* Top Accent Header */
        .hero {
          background: #10b981; /* Finance Emerald */
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 40px;
          text-align: center;
        }

        .hero h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        /* Body Content */
        .content {
          padding: 40px;
          background-color: #ffffff;
        }

        .greeting {
          font-size: 22px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
        }

        .text {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        /* Feature Row (Finance Vibe) */
        .feature-box {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
        }

        .feature-title {
          font-weight: 700;
          color: #0f172a;
          font-size: 14px;
          display: flex;
          align-items: center;
        }

        /* Premium Button */
        .cta-button {
          display: inline-block;
          background: #0f172a;
          color: #ffffff !important;
          padding: 16px 32px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          margin-top: 10px;
          text-align: center;
          transition: all 0.3s ease;
        }

        /* Footer Styling */
        .footer {
          text-align: center;
          padding: 30px;
          color: #94a3b8;
          font-size: 12px;
        }

        /* Mobile Optimization */
        @media only screen and (max-width: 600px) {
          .wrapper { padding: 0; }
          .card { border-radius: 0; max-width: 100%; }
          .hero { padding: 30px 20px; }
          .content { padding: 30px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="card" role="presentation" cellspacing="0" cellpadding="0" align="center">
          <!-- Premium Hero Section -->
          <tr>
            <td class="hero">
              <h1>Taxpal Finance</h1>
              <p style="color: #d1fae5; font-weight: 500; margin-top: 8px;">Institutional Wealth Management</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content">
              <div class="greeting">Hello, ${name} 👋</div>
              <p class="text">
                Your portfolio is ready for activation. Experience the next generation of tax optimization and wealth tracking.
              </p>

              <!-- Finance Visual Indicators -->
              <div class="feature-box">
                <div class="feature-title">✨ Smart Tax Optimization</div>
                <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Automated deductions and real-time filing support.</div>
              </div>

              <div class="feature-box">
                <div class="feature-title">🛡️ Bank-Level Encryption</div>
                <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Your data is secured by industry-leading AES-256 protocols.</div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://taxpal-finance.com/dashboard" class="cta-button">Enter Your Dashboard</a>
              </div>
            </td>
          </tr>

          <!-- Simple Footer -->
          <tr>
            <td class="footer">
              <p>© 2025 Taxpal Finance Inc. | All Rights Reserved</p>
              <p style="margin-top: 8px;">
                <a href="#" style="color: #94a3b8;">Unsubscribe</a> • <a href="#" style="color: #94a3b8;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };