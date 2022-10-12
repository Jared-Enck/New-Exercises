from unicodedata import name
from models import Department, Employee, db
from app import app

db.drop_all()
db.create_all()

d1 = Department(dept_code='mktg', dept_name='Marketing', phone='867-5309')
d2 = Department(dept_code='acct', dept_name='Accounting', phone='555-1234')
bob = Employee(name='Bob Ross', state='WA', dept_code='acct')
amelia = Employee(name='Amelia Earhart', state='WA', dept_code='acct')
idris = Employee(name='Idris Elba', state='CA', dept_code='mktg')
scar = Employee(name='Scarlett Johansson', state='CA', dept_code='mktg')

db.session.add(d1)
db.session.add(d2)
db.session.commit()

db.session.add(bob)
db.session.add(scar)
db.session.add(idris)
db.session.add(amelia)
db.session.commit()