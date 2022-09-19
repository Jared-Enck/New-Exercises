from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.debug = True

app.config['SECRET_KEY'] = 'ughmorechickens1234'

debug = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    """Shows home page"""

    return render_template('home.html')

@app.route('/about')
def about_page():
    """Shows about page"""

    return render_template('about.html')