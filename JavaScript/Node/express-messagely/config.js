/** Common config for message.ly */

// read .env files and make environmental variables
require("dotenv").config();
const env = process.env

const DB_URI = (env.NODE_ENV === "test")
  ? `socket:/var/run/postgresql?db=${env.DB_NAME_TEST}`
  : `socket:/var/run/postgresql?db=${env.DB_NAME}`;

const SECRET_KEY = env.SECRET_KEY;

const BCRYPT_WORK_FACTOR = (env.NODE_ENV === "test") ? 1 : 12;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};