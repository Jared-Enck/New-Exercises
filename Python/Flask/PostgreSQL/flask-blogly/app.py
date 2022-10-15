"""Blogly application."""

from crypt import methods
from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

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
    
    return render_template('user/list.html', users=users)

@app.route('/users/new')
def add_user_form():
    """Show add user form"""
    
    return render_template('user/add.html')

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
    
    return render_template('user/info.html', user=user, posts=posts)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    """Show edit user form"""
    
    user = User.query.get_or_404(user_id)
    
    return render_template('user/edit.html', user=user)

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

##### posts view routes #####

@app.route('/users/<int:user_id>/posts/new')
def show_post_form(user_id):
    """Shows add post form"""
    
    user = User.query.get_or_404(user_id)    
    
    return render_template('post/add_post.html', user=user)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def process_add_post_form(user_id):
    """Take values from add post form and add to db"""

    user = User.query.get_or_404(user_id)    
    
    post = Post(title=request.form['title'],content=request.form['content'],user_id=user.id)
    
    db.session.add(post)
    db.session.commit()
    
    return redirect(f'/users/{user.id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show post info"""
    
    post = Post.query.get_or_404(post_id)
    
    return render_template('post/show_post.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def post_edit(post_id):
    """Show edit post from"""
    
    post = Post.query.get_or_404(post_id)
    
    return render_template('post/edit_post.html', post=post)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def save_edited_post(post_id):
    """Save edited post to db"""
    
    post = Post.query.get_or_404(post_id)
    
    post.title = request.form['title']
    post.content = request.form['content']
    
    db.session.add(post)
    db.session.commit()
    
    return redirect(f'/posts/{post.id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete post from db"""
    
    post = Post.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    
    return redirect(f'/users/{post.user_id}')

#### Tag view routes ####

@app.route('/tags')
def show_all_tags():
    """Shows all tags"""
    
    tags = Tag.query.all()
    
    return render_template('tag/tags.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def tag_info(tag_id):
    """Show tag to edit or delete"""
    
    tag = Tag.query.get_or_404(tag_id)
    
    return render_template('tag/tag_info.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    """Show edit tag form"""
    
    tag = Tag.query.get_or_404(tag_id)
    
    return render_template('tag/edit_tag.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def process_edit_tag(tag_id):
    """Save edited tag to db"""
    tag = Tag.query.get_or_404(tag_id)
    
    tag.name = request.form['name']
    
    db.session.add(tag)
    db.session.commit()
    
    return redirect('/tags')