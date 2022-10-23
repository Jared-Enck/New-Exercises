"""Models for Cupcake app."""
from ctypes import sizeof
from logging.handlers import RotatingFileHandler
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
default_img = 'https://tinyurl.com/demo-cupcake'

class Cupcake(db.Model):
    """Create a cupcake"""
    
    __tablename__ = 'cupcakes'
    
    id = db.Column(db.Integer, 
                            primary_key=True, autoincrement=True)
    flavor = db.Column(db.String(20), 
                            nullable=False)
    size = db.Column(db.String(20), 
                            nullable=False)
    rating = db.Column(db.Float, 
                            nullable=False)
    image = db.Column(db.String, 
                            nullable=False, default=default_img)
    
    def serialize_cupcake(cupcake):
        """Serlialize cupcake obj to dictionary"""
        
        return {
            "id": cupcake.id,
            "flavor": cupcake.flavor,
            "size": cupcake.size,
            "rating": cupcake.rating,
            "image": cupcake.image
        }