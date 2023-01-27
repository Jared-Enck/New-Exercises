const app = require('../app')
const db = require('../db')
require('dotenv').config()
process.env.NODE_ENV = 'test'
const request = require('supertest')

console.log(process.env)

console.log(process.env.PGDATABASE)

