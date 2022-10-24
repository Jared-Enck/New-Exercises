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
    
    def __repr__(self):
        """Show info about cupcake."""

        c = self
        return f"<Cupcake {c.id} {c.flavor} {c.size} {c.rating} {c.image}>"
    
    def serialize(self):
        """Serlialize cupcake obj to dictionary"""
        
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }

    def handle_cupcake_form(form):
        """Process cupcake form data"""
        
        if form.image.data:            
            return Cupcake(
            flavor=form.flavor.data,
            size=form.size.data,
            image=form.image.data,
            rating=form.rating.data)
        else:
            return Cupcake(
            flavor=form.flavor.data,
            size=form.size.data,
            rating=form.rating.data)