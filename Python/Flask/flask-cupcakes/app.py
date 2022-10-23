"""Flask app for Cupcakes"""
from flask import Flask, redirect, render_template, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import Cupcake, db, connect_db, serialize_cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/api/cupcakes')
def show_cupcakes():
    """Shows all cupcakes"""
    
    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(c) for c in cupcakes]
    
    return jsonify(cupcakes=serialized)