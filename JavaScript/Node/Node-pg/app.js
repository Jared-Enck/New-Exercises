const express = require('express')
const ExpressError = require('./expError')
const uRoutes = require("./routes/users");

const app = express()

app.use(express.json())
app.use("/users", uRoutes);

// err handlers
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
  
    return next(err);
  });

app.use((err, req, res, next) => {
    let status = err.status || 500
    let msg = err.msg

    return res.status(status).json({
        error: {msg, status}
    })
})

module.exports = app