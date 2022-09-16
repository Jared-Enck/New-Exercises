# Put your app in here.
from flask import Flask, request
from operations import *

app = Flask(__name__)

@app.route('/add')
def add_query():
    
    a = int(request.args['a'])
    b = int(request.args['b'])

    total = add(a,b)

    return str(total)

@app.route('/sub')
def sub_query():

    a = int(request.args['a'])
    b = int(request.args['b'])

    total = sub(a,b)

    return str(total)

@app.route('/mult')
def multiply_query():

    a = int(request.args['a'])
    b = int(request.args['b'])

    total = mult(a,b)

    return str(total)

@app.route('/div')
def divide_query():

    a = int(request.args['a'])
    b = int(request.args['b'])

    total = div(a,b)

    return str(total)
