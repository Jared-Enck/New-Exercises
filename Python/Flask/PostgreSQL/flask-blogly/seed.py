from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

john = User(first_name='John', last_name='Smith', image_url='Null'
jane = User(first_name='Jane', last_name='Doe', image_url='Null'
            
db.session.add(john)
db.session.add(jane)

db.session.commit()