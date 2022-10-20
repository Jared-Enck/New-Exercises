from email.policy import default
from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, Optional, NumberRange, URL, AnyOf

class PetForm(FlaskForm):
    """Form for adding pets."""
    
    name = StringField("Pet name", 
                                validators=[InputRequired()])
    species = StringField("Species", 
                                validators=[InputRequired(), 
                                            AnyOf(values=['cat','dog','porcupine','chicken','bird','rat','rabbit'])])
    photo = StringField("Photo URL", 
                                validators=[Optional(),URL(require_tld=False,
                                                           message=('Must be in a URL format.'))])
    age = IntegerField("Age", 
                                validators=[Optional(),NumberRange(min=0,max=30,
                                                                   message=('Age must be between 0 and 30'))])
    notes = TextAreaField("Comments", 
                                validators=[Optional()])
    
class EditPetForm(FlaskForm):
    """Form for editing pets."""

    photo = StringField(
        "Photo URL", validators=[Optional(), URL(require_tld=False,
                                                    message=('Must be in a URL format.'))])

    notes = TextAreaField(
        "Comments", validators=[Optional()])

    available = BooleanField("Available?")