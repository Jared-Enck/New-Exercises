from crypt import methods
from sqlalchemy.exc import IntegrityError
from flask import Flask, redirect, render_template, request, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import LoginForm, UserForm

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
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username is taken.')
            return render_template('register.html', form=form)

        flash(f'Welcome {new_user.username}! Successfully created your account!', 'success')
        session['username'] = new_user.username
        
        return redirect(f'/users/{new_user.username}')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET','POST'])
def login_user():
    """Login user or redirect to register"""
    
    form = LoginForm()
    
    if form.validate_on_submit():
        user = User.authenticate(form)
        if user:
            flash(f'Welcome back, {user.username}!', 'info')
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']
    
    return render_template('login.html', form=form)

@app.route('/users/<username>')
def show_user_info(username):
    """Show user info html"""
    
    if 'username' not in session or session['username'] != username:
        flash('Please login first.', 'danger')
        
        return redirect('/login')
    
    user = User.query.get_or_404(username)
    
    serialized = user.serialize()
    
    return render_template('user_info.html', user=serialized)

@app.route('/logout', methods=['POST'])
def logout_user():
    """Logs user out"""
    
    session.pop('username')
    flash('Successfully logged out', 'info')
    return redirect('/')