-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE galaxies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  star_count TEXT NOT NULL
);

CREATE TABLE stars
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  planet_count INT
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbiting_around_star INT NOT NULL REFERENCES stars,
  moon_count INT
);

CREATE TABLE moons
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbiting_around_planet INT NOT NULL REFERENCES planets
);

CREATE TABLE celestial_body_relation
(
  id SERIAL PRIMARY KEY,
  galaxy_id INT REFERENCES galaxies,
  star_id INT REFERENCES stars,
  planet_id INT REFERENCES planets,
  moon_id INT REFERENCES moons
);

INSERT INTO galaxies
  (name, star_count)
VALUES
  ('Mliky Way', '100-400 Billion');

INSERT INTO stars
  (name, planet_count)
VALUES
  ('The Sun', 9),
  ('Proxima Centauri', 2),
  ('Gliese 876', 3);

INSERT INTO planets
  (name, orbital_period_in_years, orbiting_around_star, moon_count)
VALUES
  ('Earth', 1.00, 1, 1),
  ('Mars', 1.88, 1, 2),
  ('Venus', 0.62, 1, 0),
  ('Neptune', 164.8, 1, 14),
  ('Proxima Centauri b', 0.03, 2, 0),
  ('Gliese 876 b', 0.23, 3, 0);

INSERT INTO moons
  (name, orbiting_around_planet)
VALUES
  ('The Moon', 1),
  ('Phobos',2),
  ('Deimos',2),
  ('Naiad',4),
  ('Thalassa',4),
  ('Despina',4),
  ('Galatea',4),
  ('Larissa',4),
  ('S/2004 N 1',4),
  ('Proteus',4),
  ('Triton',4),
  ('Nereid',4),
  ('Halimede',4),
  ('Sao',4),
  ('Laomedeia',4),
  ('Psamathe',4),
  ('Neso',4);

INSERT INTO celestial_body_relation
  (galaxy_id, star_id, planet_id, moon_id)
VALUES
  (1,1,1,1),
  (1,1,2,1),
  (1,1,2,2),
  (1,1,3,NULL),
  (1,1,4,1),
  (1,1,4,2),
  (1,1,4,3),
  (1,1,4,4),
  (1,1,4,5),
  (1,1,4,6),
  (1,1,4,7),
  (1,1,4,8),
  (1,1,4,9),
  (1,1,4,10),
  (1,1,4,11),
  (1,1,4,12),
  (1,1,4,13),
  (1,1,4,14),
  (1,1,4,14),
  (1,2,5,NULL),
  (1,3,6,NULL);