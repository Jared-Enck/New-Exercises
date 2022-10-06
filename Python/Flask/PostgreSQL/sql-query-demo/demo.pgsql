DROP DATABASE reddit_clone;
CREATE DATABASE reddit_clone;
\c reddit_clone;

CREATE TABLE subreddits (
    id SERIAL,
    name VARCHAR(15) NOT NULL,
    description TEXT, 
    subs INT CHECK (subs > 0) DEFAULT 1, 
    is_private BOOLEAN DEFAULT false
);

CREATE TABLE users (
    id SERIAL,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

