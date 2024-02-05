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

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Taskify Sign Up Verification",
      text: "",
      html:  //CHANGE DESIGN OF LETTER
      `
            <div>
                <h1>
                    Press this button to verify an account:
                </h1>

                <form action="${link}">
                <input type="submit" value="Verify" />
                </form>
            </div>
        `
    });
  }
}

module.exports = new MailService();
