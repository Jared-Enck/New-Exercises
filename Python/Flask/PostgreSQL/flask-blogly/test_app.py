from urllib import response
from app import app
from unittest import TestCase
from models import db, connect_db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class ViewRouteTestCase(TestCase):
    """Test GET and redirect routes"""
    
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
    
    def test_GET(self):
        with app.test_client() as client:
            
            resp = client.get('/users')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code,200)
            self.assertIn('<h1>All Users</h1>', html)
    
    def test_POST(self):
        with app.test_client() as client:
            
            resp = client.post('/users/new',
                               data={'first_name': 'Jane', 'last_name': 'Doe', 'image_url': ''})
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 302)
            self.assertIn('', html)