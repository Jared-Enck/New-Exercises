from crypt import methods
from flask import Flask, redirect, render_template, request, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import UserForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def redirect_register():
    """Redirects to register form"""
    
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    """Shows or handles register form"""
    
    form = UserForm()
    
    if form.validate_on_submit():
                
        new_user = User.register(form)
        
        db.session.add(new_user)
        db.session.commit()

        if new_user.first_name:
            flash(f'Welcome {new_user.first_name}! Successfully created your account!', 'success')
        else:
            flash(f'Welcome {new_user.username}! Successfully created your account!', 'success')
        
        return redirect('/secret')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET','POST'])
def login_user():
    """Login user or redirect to register"""
    
    

@app.route('/secret')
def show_secret():
    """Show secret html"""
    
    if 'username' not in session:
        flash('Please login first.', 'danger')
        
        return redirect('/login')
    
    return render_template('secret.html')