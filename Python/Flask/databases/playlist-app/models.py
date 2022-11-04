"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""

    __tablename__ = 'playlists'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(50), nullable=False)
    
    @classmethod
    def songs(cls, playlist_id):
        """Get songs on playlist"""
        
        songs = db.session.query(Song).\
            join(PlaylistSong).filter(
                PlaylistSong.playlist_id == playlist_id).all()
        
        return songs
            
class Song(db.Model):
    """Song."""

    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30), nullable=False)
    artist = db.Column(db.String(20), nullable=False)
    
    @classmethod
    def playlists(cls, song_id):
        """Get playlists associated with song."""
        
        playlists = db.session.query(Playlist).\
            join(PlaylistSong).filter(
                PlaylistSong.song_id == song_id).all()
        
        return playlists

class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))

# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
