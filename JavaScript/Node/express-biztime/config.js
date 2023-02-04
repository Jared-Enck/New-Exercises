require('dotenv').config()
const env = process.env;

let dbase = env.DB_NAME

if (env.NODE_ENV === 'test') {
  dbase = env.DB_NAME_TEST
}

const config = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: dbase,
  },
};

module.exports = config;