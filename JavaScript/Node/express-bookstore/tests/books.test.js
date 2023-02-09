const app = require('../app')
const db = require("../db");
const request = require('supertest')

let testBook;
let testBook2;
let testBookDataMissing = {
    "amazon_url": "http://a.co/eobPtX3",
    "author": "Some Person",
    "language": "english",
    "publisher": "That One Publisher",
    "title": "Super Great Title",
    "year": 2023
}

beforeEach(async function () {
    const result = await db.query(`
    INSERT INTO books 
        (isbn, amazon_url, author, language, pages, publisher, title, year) 
    VALUES 
        ('0691161518', 'http://a.co/eobPtX2', 'Matthew Lane', 'english', '264', 'Princeton University Press', 'Power-Up: Unlocking Hidden Math in Video Games', '2017')
    RETURNING 
        isbn, amazon_url, author, language, pages, publisher, title, year`
    );
    testBook = result.rows[0]
});

afterEach(async () => {
    await db.query(`DELETE FROM books`)
})

afterAll(async () => {
    await db.end()
})

describe('GET /books', () => {
    test('Get all books', async function() {
        const res = await request(app).get('/books')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            books: [ testBook ] 
        })
    })
})

describe('GET /books/:id', () => {
    test('Get a book by id (isbn)', async function() {
        const res = await request(app).get(`/books/${testBook.isbn}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            book: testBook
        })
    })
    test('Responds with 404 for invalid isbn', async function() {
        const res = await request(app).get(`/books/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /books', () => {
    test('Create a new book.', async function() {
        testBook2 = {
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX3",
            "author": "Some Person",
            "language": "english",
            "pages": 420,
            "publisher": "That One Publisher",
            "title": "Super Great Title",
            "year": 2023
        }
        const res = await request(app).post(`/books`).send(testBook2)
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ 
            book: testBook2
        })
    })
    test('Responds with 400 if missing data', async function() {
        // book is missing isbn and pages
        const res = await request(app).post('/books').send(testBookDataMissing)
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({
            error: {
                message: [
                    `instance requires property "isbn"`, 
                    `instance requires property "pages"`
                ], 
                status: 400
            }
        })
    })
})

describe('PUT /books/:isbn', () => {
    test('Update a book by isbn', async function() {
        const data = {
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Some Person",
            "language": "english",
            "pages": 9999,
            "publisher": "That One Publisher",
            "title": "Super Great Title: Volume 2",
            "year": 2023
        }

        const res = await request(app).put(`/books/${testBook.isbn}`).send(data)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            book: data
        })
    })
    test('Responds with 400 if missing data', async function() {
        // book is missing isbn and pages
        const res = await request(app).put(`/books/${testBook.isbn}`).send(testBookDataMissing)
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({
            error: {
                message: [
                    `instance requires property "isbn"`, 
                    `instance requires property "pages"`
                ], 
                status: 400
            }
        })
    })
    test('Responds with 404 for invalid isbn', async function() {
        const res = await request(app).get(`/books/0`)
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /books/:isbn', () => {
    test('Deleting a book', async function() {
        const res = await request(app).delete(`/books/${testBook.isbn}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ 
            message: 'Book deleted' 
        })
    })
    test('Responds with 404 for invalid isbn', async function() {
        const res = await request(app).delete(`/books/0`)
        expect(res.statusCode).toBe(404)
    })
})