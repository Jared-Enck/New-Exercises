from cgitb import html
from urllib import response
from app import app
from unittest import TestCase
from models import db, connect_db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class ViewRouteTestCase(TestCase):
    """Test view routes"""
    
    def setUp(self):
        """Cleanup existing users"""
        
        User.query.delete()
        
        user = User(first_name='Jane',last_name='Doe',image_url='some_url')
        db.session.add(user)
        db.session.commit()
        
        self.user_id = user.id
        
        
    def tearDown(self):
        """Cleanup any fouled transaction"""
        
        db.session.rollback()
    
    def test_get_users(self):
        with app.test_client() as client:
            
            resp = client.get('/users')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code,200)
            self.assertIn('<h1>All Users</h1>', html)
            
    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Jane Doe</h1>', html)
            
    def test_show_add_post_form(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}/posts/new')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Add Post</h1>', html)
            
class DBTestCase(TestCase):
    """Test db routes"""
    
    def setUp(self):
        """Cleanup existing users"""
        
        User.query.delete()
        
        user = User(first_name='Jane',last_name='Doe',image_url='some_url')
        db.session.add(user)
        db.session.commit()
        
        self.user_id = user.id
        
        
    def tearDown(self):
        """Cleanup any fouled transaction"""
        
        db.session.rollback()
    
    def test_add_new_user(self):
        with app.test_client() as client:
            user = {'first_name': 'John', 'last_name': 'Smith', 'image_url': ''}
            resp = client.post('/users/new', 
                               data = user, follow_redirects=True)
            html = resp.get_data(as_text=True)
                    
            self.assertEqual(resp.status_code, 200)
            self.assertIn('John Smith', html)
            
    def test_delete_user(self):
        with app.test_client() as client:        
            resp = client.post(f'/users/{self.user_id}/delete', 
                               data = {'id': self.user_id}, follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('Jane', html)
            
    def test_add_post(self):
        with app.test_client() as client:        
            post = {'title': 'dis a post',
                    'content': 'ayyyy',
                    'user_id': self.user_id}
            resp = client.post(f'/users/{self.user_id}/posts/new',
                               data=post, follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('dis a post', html)
            
        
            
    