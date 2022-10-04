--Query1:
    INSERT INTO products (name,price,can_be_returned)
    VALUES ('chair','44.00','0');
--Query2:
    INSERT INTO products (name,price,can_be_returned)
    VALUES ('stool','25.99','1');
--Query3:
    INSERT INTO products (name,price,can_be_returned)
    VALUES ('table','124.00','0');
--Query4:
    SELECT * FROM products;
--Query5:
    SELECT name FROM products;
--Query6:
    SELECT name, price FROM products;
--Query7:
    INSERT INTO products (name,price,can_be_returned)
    VALUES ('silverware','12.50','1');
--Query8:
    SELECT * FROM products
    WHERE can_be_returned = '1';
--Query9:
    SELECT * FROM products
    WHERE price < 44.00;
--Query10:
    SELECT * FROM products
    WHERE price BETWEEN 22.50 AND 99.99;
--Query11:
    UPDATE products SET price = price - 20 WHERE price > 20;
--Query12:
    DELETE FROM products WHERE price < 25;
--Query13:
    UPDATE products SET price = price + 20;
--Query14:
    UPDATE products SET can_be_returned = '1';