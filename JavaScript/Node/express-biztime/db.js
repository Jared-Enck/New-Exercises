const ExpressError = require('./expressError')
const { Client } = require("pg");

let dbase;

if (process.env.NODE_ENV === 'test') {
  dbase = process.env.PGTESTDB
} else {
  dbase = process.env.PGDATABASE
}

const DB_URI = `postgresql://
${process.env.PGUSER}:
${process.env.PGPASSWORD}/
${dbase}`

const client = new Client({
    connectionString: DB_URI,
  })

client.connect()

module.exports = client