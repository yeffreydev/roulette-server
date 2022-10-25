-- create roulette TABLE

CREATE TABLE roulette (id INT AUTO_INCREMENT PRIMARY KEY, userId INT(50) NOT NULL, name VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- create a roulette
INSERT INTO roulette (userId, name) VALUES (10, "this is name");

-- read a roulette

SELECT * FROM roulette WHERE id = ?;

-- read all roulette by user

SELECT * FROM roulette WHERE userId = ?;