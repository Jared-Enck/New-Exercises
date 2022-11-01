from crypt import methods
from sqlalchemy.exc import IntegrityError
from flask import Flask, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import Feedback, db, connect_db, User
from forms import LoginForm, UserForm, AddFeedback

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
    feedback = Feedback.query.filter(Feedback.username == user.username).all()
    
    serialized = user.serialize()
    
    return render_template('user_info.html', user=serialized, feedback=feedback)

@app.route('/logout', methods=['POST'])
def logout_user():
    """Logs user out"""
    
    session.pop('username')
    flash('Successfully logged out', 'info')
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """Delete user from db"""
    
    user = User.query.get_or_404(username)
    
    if 'username' not in session or session['username'] != username:
        flash('Please login first.', 'danger')
        
        return redirect('/login')
    
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    
    flash('Successfully deleted your account.', 'success')
    
    return redirect('/')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    """Show and handle add feedback form"""
    
    form = AddFeedback()
    
    if 'username' not in session or session['username'] != username:
        flash('Please login first.', 'danger')

        return redirect('/login')
    
    if form.validate_on_submit():
        
        feedback = Feedback(
            title=form.title.data, 
            content=form.content.data,
            username=username)
        
        db.session.add(feedback)
        db.session.commit()
        
        flash('Thank you for your feedback!', 'success')
        
        return redirect(f'/users/{username}')        
    
    return render_template('add_feedback.html', form=form)

@app.route('/feedback/<int:f_id>/update', methods=['GET', 'POST'])
def edit_feedback(f_id):
    """Show and handle edit feedback form"""
    
    feedback = Feedback.query.get_or_404(f_id)
    
    form = AddFeedback(obj=feedback)
    
    if 'username' not in session or session['username'] != feedback.username:
        flash('Please login first.', 'danger')

        return redirect('/login')

    if form.validate_on_submit():
        
        feedback.title = form.title.data
        feedback.content = form.content.data
        
        db.session.add(feedback)
        db.session.commit()
        
        flash(f'Successfully edited "{feedback.title}".', 'success')
        
        return redirect(f'/users/{feedback.username}') 
    
    return render_template('edit_feedback.html', form=form)

@app.route('/feedback/<int:f_id>/delete', methods=['POST'])
def delete_feedback(f_id):
    """Delete feedback from db"""
    
    fb = Feedback.query.get_or_404(f_id)
    
    if 'username' not in session or session['username'] != fb.username:
        flash('Please login first.', 'danger')
        
        return redirect('/login')
    
    db.session.delete(fb)
    db.session.commit()
    
    flash('Successfully deleted your feedback.', 'success')
    
    return redirect(f'/users/{fb.username}')