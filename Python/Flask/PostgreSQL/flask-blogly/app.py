"""Blogly application."""

from crypt import methods
from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

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
    """Take values from add user form and add to db"""
    
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    
    new_user = User(first_name=first_name,last_name=last_name,image_url=image_url)
    
    db.session.add(new_user)
    db.session.commit()
    
    return redirect('/users')

@app.route('/users/<int:user_id>')
def info_page(user_id):
    """Shows user info"""
    
    user = User.query.get_or_404(user_id)    
    posts = Post.query.filter(Post.user_id == user.id)
    
    return render_template('info.html', user=user, posts=posts)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    """Show edit user form"""
    
    user = User.query.get_or_404(user_id)
    
    return render_template('edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def process_edit_form(user_id):
    """Save edited user info"""
    
    u = User.query.get_or_404(user_id)

    u.first_name = request.form['first_name']
    u.last_name = request.form['last_name']
    u.image_url = request.form['image_url']
    
    db.session.add(u)
    db.session.commit()
    
    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def remove_user(user_id):
    """Delete user from db"""
    
    u = User.query.get_or_404(user_id)
    
    db.session.delete(u)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def show_post_form(user_id):
    """Shows add post form"""
    
    user = User.query.get_or_404(user_id)    
    
    return render_template('add_post.html', user=user)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def process_add_post_form(user_id):
    """Take values from add post form and add to db"""

    user = User.query.get_or_404(user_id)    
    
    post = Post(title=request.form['title'],content=request.form['content'],user_id=user.id)
    
    db.session.add(post)
    db.session.commit()
    
    flash(f"Post '{post.title}' added.")
    
    return redirect(f'/users/{user.id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show post info"""
    
    post = Post.query.get_or_404(post_id)
    
    return render_template('show_post.html', post=post)
    
    