const ExpressError = require('./expressError')
const { Client } = require('pg');
const config = require('./config').db;
process.env.NODE_ENV = 'test'
console.log(config.database)

const DB_URI = `socket:/var/run/postgresql?db=${config.database}`;

const client = new Client({
  connectionString: DB_URI,
})

client.connect()

module.exports = client