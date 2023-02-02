const path = require('path')
const ExpressError = require('./expressError')
const { Client } = require('pg');
const config = require('./config');

const env = process.env

let dbase = config.db.database

if (env.NODE_ENV === 'test') {
  dbase = env.DB_NAME_TEST
}

// const client = new Client(config.db)

// const DB_URI = `socket:/var/run/postgresql?db=${dbase}`;

const DB_URI = `postgresql:///${dbase}`;

const client = new Client({
  connectionString: DB_URI,
})

client.connect()

module.exports = client