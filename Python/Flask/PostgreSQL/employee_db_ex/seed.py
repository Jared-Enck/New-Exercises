from unicodedata import name
from models import Department, Employee, db
from app import app

db.drop_all()
db.create_all()

d1 = Department(dept_code='mktg', dept_name='Marketing', phone='867-5309')
d2 = Department(dept_code='acct', dept_name='Accounting', phone='555-1234')
bob = Employee(name='Bob Ross', state='WA', dept_code='mktg')
scar_jo = Employee(name='Scarlett Johansson', state='CA', dept_code='acct')

db.session.add(d1)
db.session.add(d2)
db.session.add(bob)
db.session.add(scar_jo)

db.session.commit()