from email.policy import default
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange

class CupcakeForm(FlaskForm):
    """Form to add cupcakes"""
    
    flavor = StringField('Cupcake Flavor',
                         validators=[InputRequired(),
                                     AnyOf(values=['vanilla', 'chocolate', 'strawberry', 'cherry', 'mint'])])
    
    size = StringField('Size', 
                       validators=[InputRequired(), 
                                   AnyOf(values=['small', 'large'])])
    
    rating = IntegerField('Rating', 
                          validators=[Optional(), NumberRange(min=1, max=10)])
    
    image = StringField('Cupcake Image URL',
                        validators=[Optional(),URL(require_tld=False,
                            message=('Must be in a URL format.'))])