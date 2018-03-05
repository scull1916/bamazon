#create bamazon table and products database
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

item_id INTEGER(11) AUTO_INCREMENT NOT NULL,

product_name VARCHAR(100),

department_name VARCHAR(50),

price DECIMAL(7,2),

stock_qty INTEGER(11),

PRIMARY KEY(item_id)
);

#populate store with inventory
INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("toothbrush","HBA",1.49,10);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("toothpaste","HBA",1.29,23);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("bicycle","Sporting Goods",549.99,30);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("water bottle","Sporting Goods",8.99,45);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("hiking boots","Outdoors",119.99,38);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("sleeping bag","Outdoors",109.99,12);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("protein bar","Grocery",1.49,100);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("instant soup","Grocery",2.39,84);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("A Game of Thrones","Books",8.99,22);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES ("Miles Davis Kind of Blue","Music",14.99,18);

