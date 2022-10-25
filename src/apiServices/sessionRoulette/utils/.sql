-- create session roulette TABLE

CREATE TABLE session_roulette (id INT AUTO_INCREMENT PRIMARY KEY, rouletteId INT(50) NOT NULL, userId INT(50) NOT NULL, name VARCHAR(50) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- create a sesion roulette
INSERT INTO session_roulette (userId, rouletteId, name) VALUES (10,10, "this is name");

-- read a seession roulette

SELECT * FROM session_roulette WHERE id = ?;

-- read all session_roulette by user

SELECT * FROM session_roulette WHERE userId = ?;