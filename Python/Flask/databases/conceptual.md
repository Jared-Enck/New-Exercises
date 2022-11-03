### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?  
  object relational database system

- What is the difference between SQL and PostgreSQL?  
  SQL is a relational db system vs PostgreSQL being an object-relational db system. PostgreSQL offers more complex data types and allows for object inheritance.

- In `psql`, how do you connect to a database?  
  \c *name of db*

- What is the difference between `HAVING` and `WHERE`?  
  WHERE selects rows before groups, HAVING selects rows after the groups are computed

- What is the difference between an `INNER` and `OUTER` join?  
  INNER join gives results on the intersection of two tables. OUTER results in the union of the tables.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?  
  LEFT OUTER returns all rows for left table and only the rows in the other table that meet the condition. RIGHT OUTER does the same only all the rows for the right table.

- What is an ORM? What do they do?  
  ORM (Object-Relational-Mapper)is a layer between the server and db. It creates objects to map the relational data. Handles queries, so you don't have to write native SQL, and can use your application langauge.

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?  
  AJAX has DOM manipulation and data is typically in JSON. Requests renders html.

- What is CSRF? What is the purpose of the CSRF token?  
  CSRF token is a unique value that is generated server-side to authenticate requests and defend against CSRF attacks.

- What is the purpose of `form.hidden_tag()`?  
  It's a template argument that generates hidden fields with the CSRF token to protect against CSRF attacks.
