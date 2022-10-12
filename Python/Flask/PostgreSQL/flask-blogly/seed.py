from models import User, db
from app import app

db.drop_all()
db.create_all()

User.query.delete()

john = User(first_name='John', last_name='Smith')
jane = User(first_name='Jane', last_name='Doe', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHFRfjt8tXyf0GOnD_JNjbwCqpwTNr2xn3eK_SWW_&s')
            
db.session.add(john)
db.session.add(jane)

db.session.commit()