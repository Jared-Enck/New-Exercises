DROP DATABASE reddit_clone;
CREATE DATABASE reddit_clone;
\c reddit_clone;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users ON DELETE CASCADE,
    comment_text TEXT NOT NULL
);


CREATE TABLE subreddits (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users ON DELETE SET NULL,
    name VARCHAR(15) NOT NULL,
    description TEXT, 
    subs INT CHECK (subs > 0) DEFAULT 1, 
    is_private BOOLEAN DEFAULT false
);

INSERT INTO users (username, password)
VALUES
('testuser1', 'test12345'),
('testuser2', 'test67890');

INSERT INTO subreddits (name, user_id)
VALUES
('test_subreddit', 2),
('test_subreddit2', 1);