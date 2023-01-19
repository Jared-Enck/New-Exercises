const express = require('express')
const ExpressError = require('../expError')
const router = new express.Router()
const ITEMS = require('../fakeDB')

router.get('/', (req, res) => {
    return res.json({ items: ITEMS })
})

router.post('/', (req, res, next) => {
    try {
        if (!req.body.name || typeof req.body.name !== 'string') {
            throw new ExpressError('Item must have a name.', 400)
        }
        if (typeof req.body.price !== 'number') {
            throw new ExpressError('Price must be a number', 400)
        }
        const newItem = { name: req.body.name, price: req.body.price }
        ITEMS.push(newItem)

        return res.status(201).json({ added: newItem })
    } catch (e) {
        return next(e)
    }
})

router.get('/:name', (req, res, next) => {
    try {
        const item = ITEMS.find(i => i.name.toLowerCase() === req.params.name.toLowerCase())
        if (item === undefined) {
            throw new ExpressError('Item not found', 404)
        }
        return res.json({item})
    } catch (e) {
        return next(e)
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        const item = ITEMS.find(i => i.name.toLowerCase() === req.params.name.toLowerCase())
        if (item === undefined) {
            throw new ExpressError('Item not found', 404)
        }
        item.name = req.body.name
        item.price = req.body.price
        return res.json({ updated: item })
    } catch (e) {
        return next(e)
    }
})

router.delete('/:name', (req, res, next) => {
    try {
        const item = ITEMS.find(i => i.name.toLowerCase() === req.params.name.toLowerCase())
        if (item === undefined) {
            throw new ExpressError('Item not found', 404)
        }
        // stuff here
    } catch (e) {
        return next(e)
    }
})


module.exports = router