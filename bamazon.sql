DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id INT(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);

Select * from products;

INSERT INTO products (product_name, dept_name, price, stock_qty)
VALUES ("Whisker Biscutis", "Fireworks", 7.00, 100),
("Nipsy Daisers", "Fireworks", 2.99, 80),
("Spleen Splitters", "Fireworks", .25, 600),
("Lebaneese Whiskey", "Food", 5.00, 100),
("Hemi Cuda", "Auto", 782.00, 3),
("Cheese Burger", "Food", 3.00, 200),
("Black Market Surgery", "Services", 8000.00, 3),
("Self Respect", "Services", 38.00, 10),
("Monkeys", "Labor", 200, 700),
("Ribeye 10oz", "Food", 4.99, 309),
("2011 Infinity G37x", "Auto", 12000.00, 5);