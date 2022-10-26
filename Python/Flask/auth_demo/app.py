from crypt import methods
from operator import ne
from sqlite3 import IntegrityError
from types import new_class
from flask_cors import CORS
from flask import Flask, redirect, render_template, request, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Tweet
from forms import UserForm, TweetForm

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
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username is taken.')
            return render_template('register.html', form=form)
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

@app.route('/tweets', methods=['GET', 'POST'])
def show_tweets():
    """Shows tweets"""
        
    if 'user_id' not in session:
        flash('Please login first.', 'danger')
        
        return redirect('/')
    form = TweetForm()
    
    all_tweets = Tweet.query.all()
    if form.validate_on_submit():
        text = form.text.data
        new_tweet = Tweet(text=text, user_id=session['user_id'])
        
        db.session.add(new_tweet)
        db.session.commit()
        
        flash('Tweet Created!', 'success')
        return redirect('/tweets')
    
    return render_template('tweets.html', form=form, tweets=all_tweets)

@app.route('/tweets/<int:id>', methods=['POST'])
def delete_tweet(id):
    """Delete tweet"""
    if 'user_id' not in session:
        flash('Please login first', 'error')
        return redirect('/login')
    tweet = Tweet.query.get_or_404(id)
    
    if tweet.user_id == session['user_id']:
        db.session.delete(tweet)
        db.session.commit()
        flash('Tweet Deleted!', 'info')
        return redirect('/tweets')
    
    flash("You can't do that", 'danger')
    return redirect('/tweets')

@app.route('/logout', methods=['POST'])
def logout_user():
    """Logs user out"""
    
    session.pop('user_id')
    flash('Successfully logged out', 'info')
    return redirect('/')