-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE album
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  release_date DATE NOT NULL
);

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INT NOT NULL
);

CREATE TABLE productions
(
  id SERIAL PRIMARY KEY,
  producer_id INT NOT NULL REFERENCES producers,
  album_id INT NOT NULL REFERENCES album,
  artist_id INT NOT NULL REFERENCES artists,
  song_id INT NOT NULL REFERENCES songs
);

INSERT INTO producers
  (name)
VALUES
  ('Dust Brothers'),
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'),
  ('Cirkut'),
  ('Shellback'),
  ('Benny Blanco'),
  ('The Matrix'),
  ('Darkchild');

INSERT INTO artists
  (first_name,last_name)
VALUES
  ('Hanson', NULL),
  ('Queen', NULL),
  ('Mariah', 'Cary'),
  ('Boyz II Men', NULL),
  ('Lady Gaga', NULL),
  ('Bradley', 'Cooper'),
  ('Nickelback', NULL),
  ('Jay Z', NULL),
  ('Alicia', 'Keys'),
  ('Katy','Perry'),
  ('Juicy J', NULL),
  ('Maroon 5', NULL),
  ('Christina','Aguilera'),
  ('Avril', 'Lavigne'),
  ('Destiny''s Child',NULL);

INSERT INTO album
  (name, release_date)
VALUES
  ('Middle of Nowhere', '04-15-1997'),
  ('A Night at the Opera', '10-31-1975'),
  ('Daydream', '11-14-1995'),
  ('A Star Is Born', '09-27-2018'),
  ('Silver Side Up', '08-21-2001'),
  ('The Blueprint 3', '10-20-2009'),
  ('Prism', '12-17-2013'),
  ('Hands All Over', '06-21-2011'),
  ('Let Go', '05-14-2002'),
  ('The Writing''s on the Wall', '11-07-1999');

INSERT INTO songs
  (title, duration_in_seconds)
VALUES
  ('MMMBop', 238), 
  ('Bohemian Rhapsody', 355),
  ('One Sweet Day', 282),
  ('Shallow', 216),
  ('How You Remind Me', 223),
  ('New York State of Mind', 276),
  ('Dark Horse', 215),
  ('Moves Like Jagger', 201),
  ('Complicated', 244),
  ('Say My Name', 240);

INSERT INTO productions
  (producer_id,album_id,artist_id,song_id)
VALUES
  (1,1,1,1),
  (2,1,1,1),
  (3,2,2,2),
  (4,3,3,3),
  (4,3,4,3),
  (5,4,5,4),
  (5,4,6,4),
  (6,5,7,5),
  (7,6,8,6),
  (7,6,9,6),
  (8,7,10,7),
  (9,7,11,7),
  (10,8,12,8),
  (11,8,13,8),
  (12,9,14,9),
  (13,10,15,10);