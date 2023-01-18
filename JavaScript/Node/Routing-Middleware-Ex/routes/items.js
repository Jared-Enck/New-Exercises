const express = require('express')
const router = new express.Router()
const ITEMS = require('./fakeDB')

router.get('/', (req, res, next) => {
    return res.json({
        items: ITEMS
    })
})

module.exports = router