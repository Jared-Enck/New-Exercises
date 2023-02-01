/** Server startup for BizTime. */
const app = require("./app");
const config = require('./config')
const port = config.db.port
const hostname = config.db.host

app.listen(port, hostname, () => {
  console.log(`App running at ${hostname}:${port}`);
});