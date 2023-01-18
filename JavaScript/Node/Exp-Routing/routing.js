const express = require('express')
const { mean, median, mode, convertAndValidateNumsArray } = require('./doMath')
const ExpressError = require('./expError')
const app = express()

app.use(express.json())

//routes
app.get('/mean', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("Enter nums", 400)     
    }
    let numsAsStrings = req.query.nums.split(',');

    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    res.json({
        operation: "mean",
        value: mean(nums)
    })
})

app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("Enter nums", 400)     
    }
    let numsAsStrings = req.query.nums.split(',');

    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    res.json({
        operation: "median",
        value: median(nums)
    })
})

app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("Enter nums", 400)     
    }
    let numsAsStrings = req.query.nums.split(',');

    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    res.json({
        operation: "mode",
        value: mode(nums)
    })
})

//404 err
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
  
    return next(err);
  });

//err handler
app.use((err, req, res, next) => {
    let status = err.status || 500
    let msg = err.msg

    return res.status(status).json({
        error: {msg, status}
    })
})

//app.listen
app.listen(3000, () => {
    console.log('Server running on port 3000')
})