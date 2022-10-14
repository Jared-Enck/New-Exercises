from email.policy import default
from models import PostTag, User, db, Post, Tag
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

tag1 = Tag(name='Fun')
tag2 = Tag(name='Exciting')
tag3 = Tag(name='Scary')
tag4 = Tag(name='So Good')
tag5 = Tag(name='Delicious')

db.session.add_all([tag1,tag2,tag3,tag4,tag5])
db.session.commit()

tagged1 = PostTag(post_id=1,tag_id=2)
tagged2 = PostTag(post_id=1,tag_id=4)
tagged3 = PostTag(post_id=2,tag_id=2)
tagged4 = PostTag(post_id=2,tag_id=3)
tagged5 = PostTag(post_id=2,tag_id=1)
tagged6 = PostTag(post_id=3,tag_id=1)
tagged7 = PostTag(post_id=3,tag_id=2)

db.session.add_all([tagged1,tagged2,tagged3,tagged4,tagged5,tagged6,tagged7])
db.session.commit()


