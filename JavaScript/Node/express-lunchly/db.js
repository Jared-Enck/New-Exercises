/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client({
    connectionString: "socket:/var/run/postgresql?db=lunchly"
});

db.connect();

module.exports = db;
