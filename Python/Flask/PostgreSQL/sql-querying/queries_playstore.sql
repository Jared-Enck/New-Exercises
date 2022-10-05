--Query1
    SELECT * FROM analytics
    WHERE id = '1880';
--Query2
    SELECT id, app_name FROM analytics
    WHERE last_updated = '2018-08-01';
--Query3
    SELECT category, COUNT(*) FROM analytics
    GROUP BY category;
--Query4
    SELECT app_name, reviews FROM analytics
    LIMIT 5;
--Query5
    SELECT app_name, reviews, rating FROM analytics
    WHERE reviews = (SELECT MAX(reviews) FROM analytics WHERE rating >= 4.8);
--Query6
    SELECT category, AVG(rating) AS avg FROM analytics
    GROUP BY category ORDER BY avg DESC;
--Query7
    SELECT app_name, price, rating FROM analytics
    WHERE price = (SELECT MAX(price) FROM analytics WHERE rating < 3);
--Query8
    SELECT app_name, min_installs, rating FROM analytics
    WHERE min_installs <= 50 AND rating > 0 ORDER BY rating DESC;
--Query9
    SELECT app_name, min_installs, rating FROM analytics
    WHERE min_installs <= 50 AND rating > 0 ORDER BY rating DESC;
--Query10
    SELECT reviews, app_name, price FROM analytics
    WHERE price BETWEEN .10 and 1.00 ORDER BY reviews DESC LIMIT 10;
--Query11
    SELECT app_name, last_updated FROM analytics
    WHERE last_updated = (SELECT MIN(last_updated) FROM analytics);
--Query12
    SELECT app_name, price FROM analytics
    WHERE price = (SELECT MAX(price) FROM analytics);
--Query13
    SELECT SUM(reviews) AS total_reviews FROM analytics;
--Query14
    SELECT category, COUNT(app_name) AS num_apps FROM analytics
    GROUP BY category HAVING COUNT(app_name) > 300 ORDER BY num_apps DESC;
--Query15
    SELECT app_name, reviews, min_installs, min_installs/reviews AS proportion FROM analytics
    WHERE min_installs >= 100000 ORDER BY proportion DESC LIMIT 1;