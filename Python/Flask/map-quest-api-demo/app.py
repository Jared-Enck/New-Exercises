from flask import Flask, render_template, request
import requests
from secrets import mapquest_API_key

API_BASE_URL = 'http://www.mapquestapi.com/geocoding/v1/address'

app = Flask(__name__)

@app.route('/')
def show_address_form():
    return render_template('address_form.html')