*** Procedure 01 ***

DELIMITER //
create PROCEDURE addProduct(IN pname varchar(50),IN pprice int(11),IN pquantity int(11),IN pdescription text ,IN ppicture varchar(50))
BEGIN
INSERT INTO product (name, price, quantity, description, pictureName)
VALUES (pname, pprice, pquantity, pdescription, ppicture);
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

*** Procedure 06 ***

DELIMITER //
create PROCEDURE deleteProduct(IN pid int(11))
BEGIN
DELETE FROM product WHERE id = pid; 
END //
DELIMITER;

*** Update Product ***

DELIMITER //
CREATE PROCEDURE updateProduct(IN pid int(11),IN pname varchar(50),IN pprice int(11), IN pquantity int(11),IN pdescription text,IN ppicture varchar(100)) 
BEGIN 
UPDATE product set name=pname, price=pprice, quantity=pquantity, description=pdescription, pictureName=ppicture where id=pid; 
END //
DELIMITER ;