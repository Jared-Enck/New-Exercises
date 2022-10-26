from crypt import methods
from operator import ne
from types import new_class
from flask_cors import CORS
from flask import Flask, redirect, render_template, request, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import UserForm

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///auth_demo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def show_homepage():
    """Shows homepage"""
    
    return render_template('base.html')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Shows or handles user form"""
    form = UserForm()
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        new_user = User.register(username,password)
        
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        
        flash(f'Welcome {new_user.username}! Successfully created your account!', 'success')
        return redirect('/tweets')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """Show login or sign user in and redirect to /tweets"""
    
    form = UserForm()
    
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        
        user = User.authenticate(username, password)
        if user:
            flash(f'Welcome back, {user.username}!', 'success')
            session['user_id'] = user.id
            return redirect('/tweets')
        else:
            form.username.errors = ['Invalid username/password.']
            
    return render_template('login.html', form=form)

@app.route('/tweets')
def show_tweets():
    """Shows tweets"""
    
    if 'user_id' not in session:
        flash('Please login first.', 'error')
        
        return redirect('/')
    
    return render_template('tweets.html')

@app.route('/logout', methods=['POST'])
def logout_user():
    """Logs user out"""
    
    session.pop('user_id')
    flash('Successfully logged out', 'success')
    return redirect('/')