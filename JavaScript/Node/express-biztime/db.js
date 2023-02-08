const { Client } = require('pg');
const config = require('./config').db;

const DB_URI = `socket:/var/run/postgresql?db=${config.database}`;

const client = new Client({
  connectionString: DB_URI,
})

client.connect()

module.exports = client