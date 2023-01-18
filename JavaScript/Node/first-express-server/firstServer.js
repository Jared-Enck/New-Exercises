const express = require('express')
const ExpressError = require('./expressError')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app routes here.

app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>')
})

app.get('/dogs', (req, res, next) => {
    try {
        throw new ExpressError("No Dogs Allowed!", 403)
        return res.send('Bork Bork!')
    }
    catch (e) {
        next(e)
    }
})

app.get('/cats', (req, res) => {
    res.send('Meow meowww.')
})

app.post('/cats', function createCat(req, res) {
    res.send('<h2>New cat created.</h2>')
})

// custom 404, before err handler, after all routes
app.use((req, res, next) => {
    const e = new ExpressError('Page not found.', 404)
    next(e)
})

// err handler, before app.listen
app.use((err, req, res, next) => {
    let status = err.status || 500
    let msg = err.msg

    return res.status(status).json({
        error: {msg, status}
    })
})

// app.listen at the end. Args (somePort, callback)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})