require("dotenv").config();
const path = require("path");

module.exports = {
  port: process.env.PORT,
  databaseConnectionUrl: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  tmpPath: path.join(process.cwd(), "tmp"),
  avatarsPath: path.join(process.cwd(), "public", "images"),
};
