/* create number roulette TABLE*/

CREATE TABLE number_roulette (id INT AUTO_INCREMENT PRIMARY KEY, rouletteId INT(50) NOT NULL, sessionId INT(50) NOT NULL, userId INT(50) NOT NULL, valueNumber INT(2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

/* create a number roulette*/
INSERT INTO number_roulette (userId, rouletteId, sessionId, valueNumber) VALUES (10,10, 10, 10);

/* read a number roulette*/

SELECT * FROM number_roulette WHERE id = ?;

/* read all number by user */

SELECT * FROM number_roulette WHERE userId = ?;