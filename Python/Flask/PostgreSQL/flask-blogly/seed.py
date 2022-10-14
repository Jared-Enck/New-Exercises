from email.policy import default
from models import User, db, Post
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()

john = User(first_name='John', last_name='Smith')
jane = User(first_name='Jane', last_name='Doe', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHFRfjt8tXyf0GOnD_JNjbwCqpwTNr2xn3eK_SWW_&s')

db.session.add(john)
db.session.add(jane)
db.session.commit()

post1 = Post(title='First Post!', content='Hello World!', user_id=john.id)
post2 = Post(title='Yet Another Post', content='Ayyyy', user_id=john.id)
post3 = Post(title='Exciting News', content='Posts are working!', user_id=jane.id)            

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.commit()