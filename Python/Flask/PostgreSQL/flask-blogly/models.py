"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
default_img = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
    
class User(db.Model):
    """Users"""
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement= True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=False, default=default_img)

class Post(db.Model):
    """Posts"""
    
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    post = db.relationship('User', backref='posts')
    
class Tag(db.Model):
    """Tags"""
    
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    
    tagged = db.relationship('Post', secondary='posts_tags', backref='tags')
    
class PostTag(db.Model):
    """Post Tag relationship"""
    
    __tablename__ = 'posts_tags'
    
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)