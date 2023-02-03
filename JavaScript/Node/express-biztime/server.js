/** Server startup for BizTime. */
const app = require("./app");
const config = require('./config')
const port = 3000
const hostname = 'localhost'

app.listen(port, hostname, () => {
  console.log(`App running at ${hostname}:${port}`);
});