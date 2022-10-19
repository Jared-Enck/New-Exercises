from models import Pet, db
from app import app

db.drop_all()
db.create_all()

Pet.query.delete()

spot = Pet(name='Spot', species='dog', photo_url='https://images.unsplash.com/photo-1570122942985-bca0a44624da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZ1bm55JTIwYW5pbWFsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60', age=2, notes='All shots up to date. Loves to play fetch, but also is very chill', available=True)

mittens = Pet(name='Mittens', species='cat', photo_url='https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZ1bm55JTIwYW5pbWFsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60', age=4, notes='All shots up to date. Very affectionate. Shes a rehome gone wrong', available=False)

db.session.add(spot)
db.session.add(mittens)
db.session.commit()