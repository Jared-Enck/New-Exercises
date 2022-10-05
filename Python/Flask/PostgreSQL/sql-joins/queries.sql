--Query1
    SELECT * FROM owners o
    LEFT JOIN vehicles v
    ON o.id = v.owner_id;
--Query2
    SELECT first_name, last_name, COUNT(*) AS count FROM owners o
    JOIN vehicles v
    ON o.id = v.owner_id
    GROUP BY first_name, last_name
    ORDER BY first_name;
--Query3
    SELECT first_name, last_name, ROUND(AVG(price)) AS average_price, COUNT(*) AS count 
    FROM owners o
    JOIN vehicles v
    ON o.id = v.owner_id
    GROUP BY first_name, last_name
    HAVING ROUND(AVG(price)) > 10000 AND COUNT(*) > 1
    ORDER BY first_name DESC;