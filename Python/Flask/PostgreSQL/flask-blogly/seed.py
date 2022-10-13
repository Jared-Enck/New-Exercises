from models import User, db, Post
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()

john = User(first_name='John', last_name='Smith')
jane = User(first_name='Jane', last_name='Doe', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHFRfjt8tXyf0GOnD_JNjbwCqpwTNr2xn3eK_SWW_&s')

post1 = Post(title='First Post!', content='Hello World!', user_id=1)
post2 = Post(title='Yet Another Post', content='Ayyyy', user_id=1)
post3 = Post(title='Exciting News', content='Posts are working!', user_id=2)
            
db.session.add(john)
db.session.add(jane)
db.session.commit()

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.commit()