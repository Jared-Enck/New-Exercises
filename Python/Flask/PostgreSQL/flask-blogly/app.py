"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    """Shows Home Page"""
    
    return render_template('base.html')

@app.route('/users')
def list_users():
    """Shows list of all users"""
    
    users = User.query.all()
    
    return render_template('list.html', users=users)

@app.route('/users/new')
def add_user_form():
    """Show add user form"""
    
    return render_template('add.html')

@app.route('/users/new', methods=['POST'])
def process_add_user_form():
    """Take values from add user from and add to db"""
    
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    
    new_user = User(first_name=first_name,last_name=last_name,image_url=image_url)
    
    db.session.add(new_user)
    db.session.commit()
    
    return redirect('/users')