const path = require('path')
const ExpressError = require('./expressError')
const { Pool } = require('pg');
const config = require('./config')

const env = process.env

let dbase = config.db.database

if (env.NODE_ENV === 'test') {
  dbase = env.DB_TESTNAME
}

const pool = new Pool(config.db)

async function query(query, params) {
  const {rows, fields} = await pool.query(query, params);

  return rows;
}

// const DB_URI = `socket:/var/run/postgresql?db=${dbase}`;

// const DB_URI = `postgresql://
//   ${env.PGUSER}:
//   ${env.PGPASSWORD}/
//   ${dbase}`;

// const client = new Client({
//   connectionString: DB_URI,
// })

// client.connect()

module.exports = query