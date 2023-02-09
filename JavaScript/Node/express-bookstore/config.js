/** Common config for bookstore. */
require("dotenv").config();
const env = process.env

const dbase = (env.NODE_ENV === 'test') ? env.DB_NAME_TEST : env.DB_NAME

const DB_URI = `socket:/var/run/postgresql?db=${dbase}`;
const PORT = env.DB_PORT
const HOST = env.DB_HOSTNAME

module.exports = { DB_URI, PORT, HOST };