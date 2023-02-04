/** Server startup for BizTime. */
const app = require("./app");
const config = require('./config').db
const port = config.port
const hostname = config.host

app.listen(port, hostname, () => {
  console.log(`App running at ${hostname}:${port}`);
});