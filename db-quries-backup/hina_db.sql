-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2024 at 01:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hina_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addProduct` (IN `pname` VARCHAR(50), IN `pprice` INT(11), IN `pquantity` INT(11), IN `pdescription` TEXT, IN `ppicture` VARCHAR(100))   BEGIN
INSERT INTO product (name, price, quantity, description, pictureName)
VALUES (pname, pprice, pquantity, pdescription, ppicture);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addUser` (IN `uname` VARCHAR(50), IN `umail` VARCHAR(50), IN `upassword` VARCHAR(200), IN `utoken` VARCHAR(200))   BEGIN
INSERT INTO user (name, email, password, token)
VALUES (uname, umail, upassword, utoken);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProduct` (IN `pid` INT(11))   BEGIN
DELETE FROM product WHERE id = pid; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getallproduct` ()   BEGIN
    SELECT * FROM product;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserByEmail` (IN `umail` VARCHAR(50))   BEGIN 
SELECT * FROM user WHERE email=umail;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePassword` (IN `umail` VARCHAR(50), IN `upassword` VARCHAR(200))   BEGIN
UPDATE user SET password = upassword WHERE email = umail; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProduct` (IN `pid` INT(11), IN `pname` VARCHAR(50), IN `pprice` INT(11), IN `pquantity` INT(11), IN `pdescription` TEXT, IN `ppicture` VARCHAR(100))   BEGIN
UPDATE product set name=pname, price=pprice, quantity=pquantity, description=pdescription, pictureName=ppicture where id=pid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProductWithoutPicture` (IN `pid` INT(11), IN `pname` VARCHAR(50), IN `pprice` INT(11), IN `pquantity` INT(11), IN `pdescription` TEXT)   BEGIN 
UPDATE product set name=pname, price=pprice, quantity=pquantity, description=pdescription where id=pid; 
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(200) NOT NULL,
  `pictureName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `quantity`, `pictureName`) VALUES
(65, 'Tie', 5, 'ave you ever heard the term power tie? In the business world, this refers to a solid red necktie.', 5, '1722654308089.jfif'),
(67, 'Frock Baby Girl', 100, 'Blue Color Baby Frock. Age 3-6 Years', 5, '1722654294552.jfif'),
(68, 'Pink Frock', 150, 'Baby Frock. Age 1-2 Years', 6, '1722654271225.jfif'),
(69, 'Pant', 500, 'Brown Color Pant. 32\" . Age 10-12 years', 14, '1722654103097.jfif'),
(70, 'Shorts ', 200, 'Black color shorts. 16\" Age 8 years', 29, '1722654071710.jfif'),
(71, 'Sports Shirt', 250, 'Black color sports shirt. size 40\"', 13, '1722660580663.jfif'),
(74, 'Girls Sandals', 450, 'Red Color Sandals', 18, '1722653923398.jfif'),
(75, 'Sun Glasses', 50, 'Black color sun glasses for boys.', 16, '1722653898970.jfif'),
(76, 'NIKE Shoes', 2000, 'Black color nike shoes. Size 8', 25, '1722653888710.jfif'),
(77, 'Cross Body Bag', 100, 'Brown color cross body bag', 41, '1722653873166.jfif'),
(83, 'Shirt', 2000, 'New. Size 32\"', 19, '1722653856742.jfif'),
(89, 'Racing car', 11, 'Racing car toys are popular and exciting playthings for children and collectors alike. They come in various forms, sizes, and functionalities.', 3, '1722653672284.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `token`) VALUES
(58, 'Yasir Arfat', 'yasir.arfatse@gmail.com', '$2b$10$RwRJ/A8o2bVCFwpo4ErTMuc7FVW/cSAw1iHe9sNQPwmqW.nHpipCm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZUBnbWFpbC5jb20ifSwiaWF0IjoxNzIxMzIwMzE0fQ.g991pzXhqq8mKVcGflhUrSzEnEbk5hJi80oJXpPMMng'),
(59, 'Hina Zafar', 'hina.nida@gmail.com', '$2b$10$xsGpwRPWh0NHM1qLjkx5JO3OAZcY7rH6Bn.QvedKZqwhhu.baxnu.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaGluYS5uaWRhQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjEzNTczNDZ9._aBMv85JmT1HFouMQTxkrq1IPYCGWu3L3IxZAYNpH3w'),
(60, 'Ammar Bin Yasir', 'ammar.bin.yasir@gmail.com', '$2b$10$E1WVs9MDyZJSRAF9ejdfC..Tl6GbS4tncixWM70zbkW.7leffKQKG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYW1tYXIuYmluLnlhc2lyQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjE0MDc2MDh9.RyrXrAd_YzB0npODHmgK59NerFpjv8bkuKhpBhCNN1M'),
(62, 'Moosa Bin Yasir', 'moosa@gmail.com', '$2b$10$Cog4tZbHtnMLmT0.ocAJ4.etmr/TeVIvNmrl3DbqFtE5tiDnfSgj6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibW9vc2FAZ21haWwuY29tIn0sImlhdCI6MTcyMTQ0NDY5M30.mcXBLA74tFUM2NIJI_aoHN4SLosCYa8ClN8PABAQn88'),
(63, 'Essa', 'essa@gmail.com', '$2b$10$HVmnX42CcIgkE32C.yb/z.KYka1Mr3OwZM7/1XmcxSw32OgCH/IW.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZXNzYUBnbWFpbC5jb20ifSwiaWF0IjoxNzIxNDUwNjcwfQ.JnhySf3Gl1HuidUbo_IOh9l1xuYWDtZPtIERqpKoBhI'),
(73, 'Usman Habib', 'musmanhabib90@gmail.com', '$2b$10$JLxZjA4x2Dld9i4bwIFeO.AMdnfa2JBS6q9SiLzY3ZTagphzW4gUm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibXVzbWFuaGFiaWI5MEBnbWFpbC5jb20ifSwiaWF0IjoxNzIxNjQzMzMwfQ.sOD6xd-VsTZD1ysVB0MIg84e2vk0vgID-xvpHOPSrEM'),
(90, 'yasir1', 'yasir1@gmail.com', '$2b$10$/aX/xCRb/fRD.qzMUthjTuPNS.A3gSXz9HXVbwoMgXaeX951Inn/W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIxNTc1Nzh9.9ZNue7ypS69LIgUUuzouinupocwFUnck1NR25jDPTbA'),
(91, 'yasir1', 'yasir.arfatse1@gmail.com', '$2b$10$VYZn5ZtYtgX2T4iQn8UYEuD0vNZ5bSxJpHf./5ff9W9dTK/9JfQVG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTFAZ21haWwuY29tIn0sImlhdCI6MTcyMjE2ODIyM30.7cW_Y3P54MOODcNFWG-J-vKB7jUwCv_-s71dcRM_MMo'),
(92, 'Huma Zafar', 'huma@gmail.com', '$2b$10$H3l7/TlmdRSz/1zuBBlkrOA3peoA71vfJOfWV3DYWQU7EAjEsB0q.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaHVtYUBnbWFpbC5jb20ifSwiaWF0IjoxNzIyMTY5NTUxfQ.r65OGq8ilpCjPrjY7npcugxfNz-8aSFx8xLnmEeVsHg'),
(93, 'yasir2', 'yasir.arfatse2@gmail.com', '$2b$10$bWYyZsj.i4ahMkvukaXHseBDJf2usT4bV7WMCFaD9j1ZTtg3bbriS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTJAZ21haWwuY29tIn0sImlhdCI6MTcyMjIzMTk4N30.sbQo9I3Eyyj3ybIfiXERVixR7mTEB4jqrbwu0IIGvE4'),
(94, 'yasir3', 'yasir.arfatse3@gmail.com', '$2b$10$49rz93Y58TSssgBOvCwEoua9EgZbizbzON03qwo/s1UZiEvMVUSSO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTNAZ21haWwuY29tIn0sImlhdCI6MTcyMjIzMjQ1MH0.V6JlEKs6dbfA8H3sSvZraIXoPRpsjzMjS0A_PU4HrYM'),
(95, 'yasir4', 'yasir.arfatse4@gmail.com', '$2b$10$ZGAAPKy97LUcUOqPS1ZB.OZGcZKcjdWdgEqBihVRtWvWrLCJ7j0am', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTRAZ21haWwuY29tIn0sImlhdCI6MTcyMjIzMjUxM30.EnNREv0Fbevu-G3WXHLa_fbHd93vPnvxST1NFO7mJNE'),
(96, 'yasir5', 'yasir.arfatse5@gmail.com', '$2b$10$T21sD89Yv67J9sQlAr22PuEvbIrtuDW4nFeS9K1Ou2hS.BA1yiITq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTVAZ21haWwuY29tIn0sImlhdCI6MTcyMjIzOTY0NX0.G7ztFhJWM-qc1qxiushEgQYCDt31ZClmEpbcXIWNX8E'),
(99, 'yasir8', 'yasir.arfatse8@gmail.com', '$2b$10$AUZUICGXC3EwnruRQE1XbOtHCAXZc9vFGshI5tA5bSIQPvV4YZYoW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZThAZ21haWwuY29tIn0sImlhdCI6MTcyMjI2MjU3Nn0.p-zd1OeLmvWaSAQz2Wuu_3fNyS3BQ-o-UD3nGE9nG7g'),
(100, 'yasir8', 'yasir.arfatse8@gmail.com', '$2b$10$ErdsrdbPd4.wDDoIuaj6A.CVjMcJDQmtcnMJuZDRO9O6h1cHyCCvW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZThAZ21haWwuY29tIn0sImlhdCI6MTcyMjI2MjgzNn0.-Zb3R_xFwvQVpI4AbYMU1CTOrp-9YVeb3rLuesOOHfA'),
(101, 'yasir9', 'yasir.arfatse9@gmail.com', '$2b$10$w19z9KC/u0zYehtXY9qIC.DgmHIB4wfEyf430ji1dchzoZYISFaC2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTlAZ21haWwuY29tIn0sImlhdCI6MTcyMjI2Mjg2M30.4VYjBOA03DO6DBlZ5LxSJuEeeATbhSD4wbY-sJ7PoKA'),
(102, 'yasir10', 'yasir10@gmail.com', '$2b$10$f7whsfCK2hIgJIS3WkDPD.LQ2JpOBszP5TKGzAY4oodeSFZwMoASC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIxMEBnbWFpbC5jb20ifSwiaWF0IjoxNzIyMjYyOTA5fQ.O4yuD4dEQvConY0tMJ7FiRzTi-safFIMFX9xl-ThK7o'),
(103, 'yasir9', 'yasir.arfatse9@gmail.com', '$2b$10$bjgJ.EWfxqAZDgEQBqryUuZxr1hti9PydZHifBLVkfwDsQALqGrMa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTlAZ21haWwuY29tIn0sImlhdCI6MTcyMjI2MzA5OH0.h-Iit1zxlJuzlVkxPo4FPg-twcRzUqY3-p5-dKSf2CU'),
(104, 'yasir11', 'yasir.arfatse11@gmail.com', '$2b$10$2157AsKhWPS6tAnYWG6CDeH0GT1igpoej02/BY.Rf09wvEd8LY2Oq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTExQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjMyOTN9.hjBvY9n-g1Pmf2bbhkZOtWNqFx0F2DIglBo9SCBCtLU'),
(105, 'yasir12', 'yasir.arfatse12@gmail.com', '$2b$10$RcHSPvhABKL3aoVT184TqepGDzmrRHwqKFmHTZ92jsZWKAonU6doy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTEyQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM0MjR9.3aYhwd3GuPbQBMzNqnhDhHFv_HCyJYqgBdWfI0D4CrQ'),
(106, 'yasir13', 'yasir.arfatse13@gmail.com', '$2b$10$lQQzIb3G/qEBvjN6ITJPGuvmaB2cnbTS6GyahxrGd7Myt55kI1Ima', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTEzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM1MzN9.kpyei497E_NWsV37-N13nbV91vc7uYiYhmls6MiAp7o'),
(107, 'yasir14', 'yasir.arfatse14@gmail.com', '$2b$10$smlQswI2hJcCAjAia46cxuCi3DBfH2Xx8tHgyvpwbL0SO7Wz753N6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE0QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM2OTV9.incjixVaz4ayurtr8JO97HJKdnklguUn8ecYsBaAet8'),
(108, 'yasir15', 'yasir.arfatse15@gmail.com', '$2b$10$F2WosGwbaA2yvEHIWZySEeCyAWt0JRx5e62QRbCF8yU8Lpjj5ddgi', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE1QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM3OTR9.8cqeBk_fGxw2o-EH8DOi7uneQbB9-BXlkaxakStkFEM'),
(109, 'yasir16', 'yasir.arfatse16@gmail.com', '$2b$10$Y8pnOlap4M6PTJtFxrF3H.rlGbv2DEvEq.Yv6hdb.L/k1.LO7ok3K', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE2QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM4NDd9.uvJI4M0TClkRRnQMw8o4i7BMy7yvBZpTIDbovJxsDuQ'),
(110, 'yasir17', 'yasir.arfatse17@gmail.com', '$2b$10$QeuDS2yQGK0Fb1egnQpqJec0CYccoHBDYqN2hyKSv3Jgb7Hp.V.UG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE3QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjM5MTJ9.bHbm4LIaojlN3al7ndZ26oQP3Bg8RsKQe7WlgdwZwe4'),
(111, 'yasir18', 'yasir.arfatse18@gmail.com', '$2b$10$sEBIU1mWrXAeTyqCGJZYwe.2yjVJH0k7Lko6XTBV3/PPZUV.IARky', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE4QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQwMTR9.6wIvdsTbbsgHJSSbOuTxcjJkjHu-uJjnRra7EXGDTwc'),
(112, 'yasir19', 'yasir.arfatse19@gmail.com', '$2b$10$sQrvXyU8CMy.IAaKW7gFPeNbvwrK8OUuFookSkzlzfovrmM0Lbv52', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTE5QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQyNDl9._ooK2Zh-_XZpzvoGVuXfE_w2ExqO5f3C-KQ50tnsArs'),
(113, 'yasir20', 'yasir.arfatse20@gmail.com', '$2b$10$cVBe2D5Z3Y6klVAAlmgcgeNBuGItoOk.GSpI4GDep3NCzwgAtoj1O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTIwQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQzMjZ9.Vc-PssSH6ztXvpUmZ6ml849w-dYUk64UOrEYWO8q1VM'),
(114, 'yasir21', 'yasir.arfatse21@gmail.com', '$2b$10$3t4cuDPCQRF3ZMQAGayBtOBuZf0qACuO5QokJxWPV57ZgcaEHlUyO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTIxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQzNzF9.ibWQKhVgUYHY7Urecx1LivVa5xOqLUGxty345VvX5Ec'),
(115, 'yasir22', 'yasir.arfatse22@gmail.com', '$2b$10$VdKicCdVCd.qY5yyV/NEz.jStYoEEeRQwB/lHxKEOVMPyScBDGqnG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTIyQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQ0OTV9.b4X-EBX5nAmHYA2zPWfqPMi1UkA4BWlEVmngIjFOT0g'),
(116, 'yasir22', 'yasir22@gmail.com', '$2b$10$C.HQlrIkwDvdN0lrVHfBO.OvNnz8Li9E1OvGxPqdQjb34whGXF3pq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIyMkBnbWFpbC5jb20ifSwiaWF0IjoxNzIyMjY0NTUyfQ.3o_EIYsUGNYV8ODXQ6zZt21MnYI7UmYqx88KIyZmisU'),
(117, 'yasir23', 'yasir.arfatse23@gmail.com', '$2b$10$3gzReJzAqk8k1JfCjdFxcuE5dJOfELfFidnnZKin55Pxo8ErTTiuC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTIzQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MjIyNjQ5Nzl9.CqxDiFAQD9PVBAODO5NDvVjXIE72pKwa7NxNJsb_0jg'),
(118, 'yasir24', 'yasir24@gmail.com', '$2b$10$aV8QzMRE89fQw5DLtXRYJ.x..XzeH0jsD7tFKXNIza.24wi11CLwu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIyNEBnbWFpbC5jb20ifSwiaWF0IjoxNzIyMjY1MDI3fQ.yYKmNNUZJpBBKWadDaqL0QmHY3FQkYlJuym3NxlL_7o'),
(119, 'yasir23', 'yasir.arfatse23gmail.com', '$2b$10$4T7NB.9GhflGrXIK8kiL4erCYjpHqk.WsHfFW1512T9qeJ4N5q3hq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTIzZ21haWwuY29tIn0sImlhdCI6MTcyMjI2NzczMn0.2xugxBaHuVGVZ_GoGcnKIeNpVADhCdrLyg8jIm1yGpo'),
(120, 'yasir23', 'yasir.arfatse24gmail.com', '$2b$10$ppKNWApiLxFNVGG2Y8ryi.HJKx1K47HvIcIxNxj4uCSZ65m699sVO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoieWFzaXIuYXJmYXRzZTI0Z21haWwuY29tIn0sImlhdCI6MTcyMjI2NzgzMn0.OE0gTq-iwc1GDHxn-2coyU_b6bFX_WXQsaBoKibT6dA');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
