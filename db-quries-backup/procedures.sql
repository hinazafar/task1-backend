*** Procedure 01 ***

DELIMITER //
create PROCEDURE addproduct(IN pname varchar(50),IN pprice int(11),IN pdescription text ,IN ppicture longblob)
BEGIN
INSERT INTO Employees (FirstName, LastName, Email, HireDate)
VALUES (pname, pprice, pdescription, ppicture);
END //
DELIMITER;

*** Procedure 02 ***

DELIMITER //

CREATE PROCEDURE getallproduct()
BEGIN
    SELECT * FROM product;
END //

DELIMITER ;

*** Procedure 03 ***

DELIMITER //
CREATE PROCEDURE getUserByEmail(IN umail varchar(50))
BEGIN 
SELECT * FROM user WHERE email=umail;
END //
DELIMITER;

*** Procedure 04 ***

DELIMITER //
create PROCEDURE addUser(IN uname varchar(50),IN umail varchar(50),IN upassword varchar(200) ,IN utoken varchar(200))
BEGIN
INSERT INTO user (name, email, password, token)
VALUES (uname, umail, upassword, utoken);
END //
DELIMITER;

*** Procedure 05 ***

DELIMITER //
create PROCEDURE updatePassword(IN umail varchar(50),IN upassword varchar(200))
BEGIN
UPDATE user SET password = upassword WHERE email = umail; 
END //
DELIMITER;