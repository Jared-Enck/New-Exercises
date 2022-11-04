from models import db
from app import app
from models import Playlist, Song, PlaylistSong

db.drop_all()
db.create_all()

pl = Playlist(name='Coding', description='80s Metal')
song1 = Song(title='Crazy Train', artist='Ozzy Osbourne')
song2 = Song(title='One', artist='Metallica')

db.session.add(pl)
db.session.add(song1)
db.session.add(song2)
db.session.commit()

pl_song1 = PlaylistSong(playlist_id=1, song_id=1)
pl_song2 = PlaylistSong(playlist_id=1, song_id=2)

db.session.add(pl_song1)
db.session.add(pl_song2)
db.session.commit()