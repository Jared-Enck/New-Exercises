const env = process.env
env.NODE_ENV = 'test'

const app = require('../app')
const db = require('../db')
const request = require('supertest')

let testComp;

beforeEach(async () => {
    const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ('tesla', 'Tesla', 'EV Manufacturer') RETURNING code, name, description`)
    testComp = result.rows[0]
})

afterEach(async () => {
    await db.query(`DELETE FROM companies`)
})

afterAll(async () => {
    await db.end()
})

describe('GET /companies', () => {
    test('Get all companies', async function() {
        const res = await request(app).get('/companies')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            companies: [ {
                code: testComp.code, 
                name: testComp.name
            } ] 
        })
    })
})

describe('GET /companies/:code', () => {
    test('Get a single company by code.', async function() {
        const res = await request(app).get(`/companies/${testComp.code}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            company: {
                code: testComp.code, 
                name: testComp.name, 
                description: testComp.description, 
                invoices: []
            }
        })
    })
    test('Responds with 404 for invalid code', async function() {
        const res = await request(app).get(`/companies/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /companies', () => {
    test('Create new company', async function() {
        let testComp2 = { name: 'Publix', description: 'Grocery store.' }
        const res = await request(app).post('/companies').send(testComp2)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ 
            company: {
                code: expect.any(String),
                name: 'Publix',
                description: 'Grocery store.'
            } })
    })
    test('Responds with 400 if missing name', async function() {
        const res = await request(app).post('/companies').send({name:'', description: 'Grocery store.'})
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({error: {message: 'Please enter a company name', status: 400}})
    })
})

describe('PATCH /companies/:code', () => {
    test('Updating a company', async function() {
        const res = await request(app).patch(`/companies/${testComp.code}`).send({ name: 'Tesla', description: 'EV Manufacturer.' })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            company: { 
                code: 'tesla',
                name: 'Tesla', 
                description: 'EV Manufacturer.' 
            } 
        })
    })
    test('Responds with 404 for invalid code', async function() {
        const res = await request(app).patch(`/companies/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /companies/:code', () => {
    test('Deleting a company', async function() {
        const res = await request(app).delete(`/companies/${testComp.code}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            status: 'deleted' 
        })
    })
    test('Responds with 404 for invalid code', async function() {
        const res = await request(app).delete(`/companies/0`)
        expect(res.statusCode).toBe(404)
    })
})