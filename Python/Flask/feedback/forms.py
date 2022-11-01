from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import InputRequired, Email, Length, Optional

class UserForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=2,max=20)])
    password = PasswordField('Password', validators=[InputRequired()])
    email = EmailField('Email', validators=[InputRequired(), Length(max=50),Email(message=('Enter valid email.'))])
    first_name = StringField('First Name', validators=[Optional()])
    last_name = StringField('Last Name', validators=[Optional()])
    
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=2,max=20)])
    password = PasswordField('Password', validators=[InputRequired()])
    
class AddFeedback(FlaskForm):
    title = StringField('Title', validators=[InputRequired(), Length(max=100)])
    content = StringField('Content', validators=[InputRequired()])