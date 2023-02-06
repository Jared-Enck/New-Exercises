const env = process.env
env.NODE_ENV = 'test'

const app = require('../app')
const db = require('../db')
const request = require('supertest')

let testComp
let testInvoice;

beforeEach(async () => {
    const compResult = await db.query(`
    INSERT INTO companies (code, name, description) 
    VALUES ('tesla', 'Tesla', 'EV Manufacturer') 
    RETURNING code, name, description`)
    testComp = compResult.rows[0]

    const invResult = await db.query(`
    INSERT INTO invoices (id, comp_code, amt, paid, add_date, paid_date) 
    VALUES (1, 'tesla', '500', 'f', '2023-01-31', null) 
    RETURNING id, comp_code, amt, paid, add_date, paid_date`)
    testInvoice = invResult.rows[0]
})

afterEach(async () => {
    await db.query(`DELETE FROM companies`)
    await db.query(`DELETE FROM invoices`)
})

afterAll(async () => {
    await db.end()
})

describe('GET /invoices', () => {
    test('Get all invoices', async function() {
        const res = await request(app).get('/invoices')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            invoices: [ {
                id: testInvoice.id, 
                comp_code: testInvoice.comp_code
            } ] 
        })
    })
})

describe('GET /invoices/:id', () => {
    test('Get a single company by code.', async function() {
        const res = await request(app).get(`/invoices/${testInvoice.id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            invoice: {
                id: testInvoice.id,
                company: {
                    code: testComp.code, 
                    name: testComp.name, 
                    description: testComp.description
                },
                amt: testInvoice.amt,
                paid: testInvoice.paid,
                add_date: expect.any(String),
                paid_date: testInvoice.paid_date
            }
        })
    })
    test('Responds with 404 for invalid id', async function() {
        const res = await request(app).get(`/invoices/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /invoices', () => {
    test('Create new invoice', async function() {
        let testInvoice2 = { comp_code: 'tesla', amt: 9999 }
        const res = await request(app).post('/invoices').send(testInvoice2)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ 
            invoice: {
                id: expect.any(Number),
                comp_code: testInvoice2.comp_code,
                amt: testInvoice2.amt,
                paid: false,
                add_date: expect.any(String),
                paid_date: null,
            } 
        })
    })
})

describe('PUT /invoices/:code', () => {
    test('Updating an invoice', async function() {
        const payment = {amt: testInvoice.amt, paid: true}
        const res = await request(app).put(`/invoices/${testInvoice.id}`).send(payment)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            invoice: { 
                id: testInvoice.id,
                comp_code: testInvoice.comp_code,
                amt: payment.amt,
                paid: payment.paid, 
                add_date: expect.any(String),
                paid_date: expect.any(String),
            } 
        })
    })
    test('Responds with 404 for invalid id', async function() {
        const res = await request(app).patch(`/invoices/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /invoices/:id', () => {
    test('Deleting an invoice', async function() {
        const res = await request(app).delete(`/invoices/${testInvoice.id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            status: 'deleted' 
        })
    })
    test('Responds with 404 for invalid code', async function() {
        const res = await request(app).delete(`/invoices/0`)
        expect(res.statusCode).toBe(404)
    })
})