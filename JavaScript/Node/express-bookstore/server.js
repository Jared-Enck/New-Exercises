/** Server for bookstore. */
const { PORT, HOST } = require('./config')

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server starting on ${HOST}:${PORT}`);
});
