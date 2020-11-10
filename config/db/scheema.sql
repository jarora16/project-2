DROP DATABASE IF EXISTS food_db;
CREATE DATABASE food_db;
USE food_db;

    id int NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(255) NOT NULL,
    numberOfBurgers INT NOT NULL,
    itemsFromMenu VARCHAR(255) NOT NULL,
    itemsFromSide VARCHAR (30) NOT NULL,
    itemsFromDrinks VARCHAR (30) NOT NULL,
    inProgress BOOLEAN NOT NULL DEFAULT false,
    finishedORDER BOOLEAN NOT NULL DEFAULT false, 
    totalOfCart INT NOT NULL,  
    totalPrice DECIMAL(5,2) NOT NULL,
    createdAt TIMESTAMP NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE burgers(
    burgerID INT NOT NULL AUTO_INCREMENT,
    typeOfBurger VARCHAR(255) NOT NULL, 
    toppings VARCHAR(30) NOT NULL, 
    PRIMARY KEY (burgerID)
);

SELECT * FROM generalorder;
