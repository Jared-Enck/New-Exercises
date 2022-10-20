from crypt import methods
from flask import Flask, redirect, render_template, request, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import PetForm, EditPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def show_homepage():
    """Shows home page for pet list"""
    
    pets = Pet.query.all()
    
    return render_template('base.html', pets = pets)

@app.route('/add', methods=['GET','POST'])
def handle_add_pet_form():
    """Show form or process form data and add to db"""
    
    form = PetForm()
    
    if form.validate_on_submit():
        
        if form.photo.data:            
            pet = Pet(
            name=form.name.data,
            species=form.species.data,
            photo=form.photo.data,
            age=form.age.data,
            notes=form.notes.data)
        else:
            pet = Pet(
            name=form.name.data,
            species=form.species.data,
            age=form.age.data,
            notes=form.notes.data)
        
        db.session.add(pet)
        db.session.commit()
        
        flash(f'Added new pet {pet.name}.', 'success')
        return redirect('/')
    
    else:
        return render_template('add_pet_form.html', form=form)
    
@app.route('/<int:pet_id>', methods=['GET','POST'])
def show_edit_pet_info(pet_id):
    """Shows pet info and edit form"""
    
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    
    if form.validate_on_submit():
        pet.photo = form.photo.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        
        db.session.commit()
        
        flash(f"Saved {pet.name}'s new info.", 'success')
        
        return redirect('/')
    
    else:
        return render_template('pet_info.html', form=form, pet=pet)