/** Server startup for BizTime. */
require('dotenv').config()
const port = process.env.PGPORT

const app = require("./app");

app.listen(port, () => {
  console.log(`App running on port:${port}`);
});