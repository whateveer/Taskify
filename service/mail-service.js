const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // async sendActivationMail(to, link) {
  //   await this.transporter.sendMail({
  //     from: process.env.SMTP_USER,
  //     to,
  //     subject: "Taskify Sign Up Verification",
  //     text: "",
  //     html:  //CHANGE DESIGN OF LETTER
  //     `
  //           <div>
  //               <h1>
  //                   Press this button to verify an account:
  //               </h1>

  //               <form action="${link}">
  //               <input type="submit" value="Verify" />
  //               </form>
  //           </div>
  //       `
  //   });
  // }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Taskify Sign Up Verification",
      text: "",
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }

                    .container {
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        text-align: center;
                    }

                    h1 {
                        color: #333;
                    }

                    .verify-button {
                        background-color: #4caf50;
                        color: #fff;
                        padding: 10px 20px;
                        font-size: 16px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .verify-button:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Press the button below to verify your account:</h1>
                    
                    <form action="${link}">
                        <button class="verify-button" type="submit">Verify</button>
                    </form>

                    Or go by this link: ${link}
                </div>
            </body>
            </html>
        `,
    });
  }
}

module.exports = new MailService();
