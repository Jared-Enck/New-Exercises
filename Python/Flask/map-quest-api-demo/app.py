from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
import requests
from secrets import MQ_API_KEY

API_BASE_URL = 'http://www.mapquestapi.com/geocoding/v1/address'

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///***'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

@app.route('/')
def homepage():
    """Shows homepage"""
    
    return render_template('base.html')

@app.route('/add_address')
def show_address_form():
    """Shows address form"""
    
    return render_template('address_form.html')