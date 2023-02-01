/** Server startup for BizTime. */
const config = require('./config')
const port = config.db.port
const hostname = config.db.host
const app = require("./app");

app.listen(port, hostname, () => {
  console.log(`App running at http://${hostname}:${port}/`);
});