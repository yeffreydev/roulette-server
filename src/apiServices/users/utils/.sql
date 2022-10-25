CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username  varchar(50) UNIQUE NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, age INT(2) NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

--create

INSERT INTO USERS (username, email, age, password) VALUES ("testname", "testmail", 19, "ksfjdsafja");