/** Database setup for BizTime. */
const { PGPASSWORD } = require('./instance/secrets')

const { Client } = require("pg");

let dbase;

if (process.env.NODE_ENV === "test") {
  dbase = 'biztime_test';
} else {
  dbase = 'biztime';
}

const connectionString = `postgresql://jared:${PGPASSWORD}/${dbase}`

const db = new Client({
  connectionString,
});

db.connect()

module.exports = db;