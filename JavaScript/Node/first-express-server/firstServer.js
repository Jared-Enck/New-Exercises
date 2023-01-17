const express = require('express')
const res = require('express/lib/response')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app routes here.

app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1>')
})

app.get('/dogs', (req, res) => {
    return res.send('Bork Bork!')
})

app.get('/cats', (req, res) => {
    res.send('Meow meowww.')
})

app.post('/cats', function createCat(req, res) {
    res.send('<h2>New cat created.</h2>')
})

// app.listen at the end. Args (somePort, callback)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})