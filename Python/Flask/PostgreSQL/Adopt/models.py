import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
default_img = ''
    
class Pet(db.Model):
    """Create a pet"""
    
    __tablename__ = 'pets'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    species = db.Column(db.String(30), nullable=False)
    photo_url = db.Column(db.String, default=default_img)
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String(200))
    available = db.Column(db.Boolean, nullable=False, default=True)