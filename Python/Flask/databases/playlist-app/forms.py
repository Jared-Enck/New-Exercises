"""Forms for playlist app."""

from wtforms import SelectField, StringField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired, Optional, Length

class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField('Name', 
                           validators=[InputRequired(), 
                                       Length(min=2,max=30)])
    description = StringField('Description',
                                validators=[Optional(),
                                            Length(min=2,max=50)])

class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField('Title', 
                        validators=[InputRequired(), 
                                    Length(min=2,max=30)])
    artist = StringField('Artist',
                                validators=[InputRequired(),
                                            Length(min=2,max=20)])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
