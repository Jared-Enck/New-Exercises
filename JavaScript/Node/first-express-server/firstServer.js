const express = require('express')

const app = express()

// app routes here.

app.get('/dogs', (req, res) => {
    console.log('here are dogs.')
    return res.send('Bork Bork!')
})

// app.listen at the end. Args (somePort, callback)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})