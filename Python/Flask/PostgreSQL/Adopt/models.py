import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
default_img = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnVubnklMjBhbmltYWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
    
class Pet(db.Model):
    """Create a pet"""
    
    __tablename__ = 'pets'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    species = db.Column(db.String(30), nullable=False)
    photo = db.Column(db.String, nullable=False, default=default_img)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String(200))
    available = db.Column(db.Boolean, nullable=False, default=True)