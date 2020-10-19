const nodemailer = require("nodemailer");
const config = require("../config");

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport(config.smtp);
  }

  async init() {
    console.info("Creating transporter");

    await this.transporter;
  }

  async sendVerificationEmail({ to, subject, text, html }) {
    return this.transporter.sendMail({
      from: '"Anna" <anna.efimova881@gmail.com>',

      to: Array.isArray(to) ? to.join(", ") : to,
      subject: subject,
      text,
      html
    });
  }
}

module.exports = new Mailer();

