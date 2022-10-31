from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)
    
class User(db.Model):
    __tablename__ = 'users'
    
    username = db.Column(db.String(20), primary_key=True, unique=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    
    def serialize(self):
        """Serlialize user obj to dictionary"""
        
        return {
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }
        
    def list_user_info(user_obj):
        """Generates list of user_obj values"""
        
        return [ i if i is not None else '' for i in user_obj ]
        
    
    @classmethod
    def register(cls, form):
        """Register user w/hashed password & return user."""
        
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        hashed = bcrypt.generate_password_hash(password)
        
        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=hashed_utf8, email=email, first_name=first_name,last_name=last_name)
    
    @classmethod
    def authenticate(cls, form):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        username = form.username.data
        pwd = form.password.data
        
        u = User.query.filter_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            return u
        else:
            return False