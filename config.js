require("dotenv").config();
const path = require("path");

module.exports = {
  port: process.env.PORT,
  databaseConnectionUrl: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  tmpPath: path.join(process.cwd(), "tmp"),
  avatarsPath: path.join(process.cwd(), "public", "images"),

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  },
};
