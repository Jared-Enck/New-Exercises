from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = 'ughmorechickens1234'
debug = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    """Shows home page"""

    html = """
    <html>
        <body>
            <h1>Home Page</h1>
            <p>Welcome to my simple app!</p>
            <a href="/about">About Us</a>
        </body>
    </html>
    """

    return html

@app.route('/about')
def about_page():
    """Shows about page"""
    
    html = """
    <html>
        <body>
            <h1>About Page</h1>
            <p>We're awesome! That is all. Please go about your day.</p>
            <a href="/">Go Home</a>
        </body>
    </html>
    """

    return html