process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const ITEMS = require('../fakeDB')

let candybar = { name: 'snickers', price: 1.50 }

beforeEach(() => {
    ITEMS.length = 0
    ITEMS.push(candybar)
})

afterEach(() => {
    ITEMS.length = 0
})

describe('GET /items', () => {
    test('Get all items', async function() {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: [ candybar ] })
    })
})

describe('GET /items/:name', () => {
    test('Get item by name', async function() {
        const res = await request(app).get(`/items/${candybar.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: candybar })
    })
    test('Responds with 404 for invalid name', async function() {
        const res = await request(app).get(`/items/snackers`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /items', () => {
    test('Create new item', async function() {
        let candybar = { name: 'Kit-Kat', price: 1.25 }
        const res = await request(app).post('/items').send(candybar)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ added: candybar })
    })
    test('Responds with 400 if missing name', async function() {
        const res = await request(app).post('/items').send({name:'', price: 1.25})
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({error: {msg: 'Item must have a name.', status: 400}})
    })
    test('Responds with 400 if name is not type of String', async function() {
        const res = await request(app).post('/items').send({name:[1,2,3], price: 1.25})
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({error: {msg: 'Item name must be a string of text.', status: 400}})
    })
    test('Responds with 400 if price not type of Number', async function() {
        const res = await request(app).post('/items').send({name:'Kit-Kat', price: '1.25' })
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({error: {msg: 'Price must be a number', status: 400}})
    })
})

describe('PATCH /items/:name', () => {
    test('Updating candybar name', async function() {
        const res = await request(app).patch(`/items/${candybar.name}`).send({ name: 'crunch', price: 1.50 })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ updated: { name: 'crunch', price: 1.50 } })
    })
    test('Responds with 404 for invalid name', async function() {
        const res = await request(app).patch(`/items/snicker`).send({ name: 'crunch', price: 1.50 })
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', () => {
    test('Deleting an item', async function() {
        const res = await request(app).delete(`/items/${candybar.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: 'Deleted' })
    })
    test('Responds with 404 for invalid name', async function() {
        const res = await request(app).delete(`/items/snick`)
        expect(res.statusCode).toBe(404)
    })
})