-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 01, 2018 at 04:34 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `category` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `category`) VALUES
(1, 'Art-Culture'),
(2, 'Education'),
(3, 'Entrepreneurs'),
(4, 'Environment'),
(5, 'Journalism'),
(6, 'Sports'),
(7, 'Travel'),
(8, 'Techology');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `postID` int(11) DEFAULT NULL,
  `authorID` int(11) DEFAULT NULL,
  `content` text,
  `createdAt` datetime DEFAULT NULL,
  `editedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`ID`, `postID`, `authorID`, `content`, `createdAt`, `editedAt`, `deletedAt`, `status`) VALUES
(1, 8, 6, 'Great job', '2018-05-01 03:11:17', NULL, '2018-05-04', 0),
(2, 8, 6, 'Well done', '2018-05-02 10:17:49', NULL, '2018-05-04', 0),
(3, 8, 6, 'Hiiii', '2018-05-02 11:02:29', NULL, NULL, 1),
(4, 8, 6, 'Woo Hoo', '2018-05-02 11:02:40', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `ID` int(255) NOT NULL,
  `authorID` int(255) NOT NULL,
  `title` text CHARACTER SET utf8,
  `subtitle` text CHARACTER SET utf8,
  `content` text CHARACTER SET utf8,
  `categoryID` int(5) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `editedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `status` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`ID`, `authorID`, `title`, `subtitle`, `content`, `categoryID`, `createdAt`, `editedAt`, `deletedAt`, `status`) VALUES
(1, 6, 'Meeting our match: Buying 100 percent renewable energy', NULL, 'A little over a year ago, we announced that we were on track to purchase enough renewable energy to match all the electricity we consumed over the next year. We just completed the accounting for Google?s 2017 energy use and it?s official?we met our goal. Google?s total purchase of energy from sources like wind and solar exceeded the amount of electricity used by our operations around the world, including offices and data centers.\r\n\r\n\r\nWhat do we mean by ?matching? renewable energy? Over the course of 2017, across the globe, for every kilowatt hour of electricity we consumed, we purchased a kilowatt hour of renewable energy from a wind or solar farm that was built specifically for Google. This makes us the first public Cloud, and company of our size, to have achieved this feat.\r\n\r\n\r\nToday, we have contracts to purchase three gigawatts (3GW) of output from renewable energy projects; no corporate purchaser buys more renewable energy than we do. To date, our renewable energy contracts have led to over $3 billion in new capital investment around the world.', 1, '2018-04-07', NULL, NULL, 1),
(3, 6, 'aaadsdsd', NULL, 'ffgbfgbfgbfgb', 2, NULL, NULL, NULL, 1),
(8, 6, 'Noodle on this: Machine learning that can identify ramen by shop', NULL, 'There are casual ramen fans and then there are ramen lovers. There are people who are all tonkotsu all the time, and others who swear by tsukemen. And then there?s machine learning, which?based on a recent case study out of Japan?might be the biggest ramen aficionado of them all.\n\n\nRecently, data scientist Kenji Doi used machine learning models and AutoML Vision to classify bowls of ramen and identify the exact shop each bowl is made at, out of 41 ramen shops, with 95 percent accuracy. Sounds crazy (also delicious), especially when you see what these bowls look like:', 3, NULL, NULL, NULL, 1),
(9, 6, 'a lô', NULL, 'h? l?', 3, '2018-04-07', NULL, '2018-05-01', 0),
(10, 6, 'Hey', 'Yo', 'Woo Hoo', NULL, '2018-05-17', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(40) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `profilePicture` varchar(256) DEFAULT NULL,
  `forgottenPasswordCode` varchar(40) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `name`, `password`, `email`, `profilePicture`, `forgottenPasswordCode`, `createdAt`, `deletedAt`, `status`) VALUES
(6, 'admin', 'Pham Quang Huy', '$2b$10$epix0eF2WgPK3Hsr1cLlV.VaAy42Jrpiz1at6yP/mQwJD2cIO.6VO', 'p.q.huy97@gmail.com', 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, '2018-04-01', NULL, 1),
(7, 'phamhuy', 'Pham huyyyy', '$2b$10$9zRZBqjQY4ls5ij4.d94xeLaNPxB396YSr8TMYXPP55mu3ZFdM2TS', 'abc@abc.com', 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1),
(8, 'a123456', NULL, '$2b$10$B6W49xvRzaIwkFMkpr12Y.iVWp3lkUTlvmednQAARwKUwiu28i6cG', NULL, 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1),
(10, 'a1234567', NULL, '$2b$10$5G7uRGWfAf7EsACTFe2T7uIzyBZOv1g4l5FIQ85kbThB1O8l//HUy', NULL, 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1),
(11, 'a12345678', NULL, '$2b$10$2XekV359X4Zsu9OUClypH.iZ/J7p.ZmseeJxoZM3Jt14oP8mxhFoG', NULL, 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1),
(13, 'testt', 'Test Account', '$2b$10$nFED1/Mug5L5e3..FIQ1A.dzXnBlvrUosVmYHWtT/gpBbtQ3Cwm0O', 'test@test.com', 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1),
(14, 'admintest', 'Testing', '$2b$10$OVXVFwdvGz59HJeZznNzye3Q/o38IPSr7kw38RtRT1Di3dBK7OsqS', 'test@test.com.vn', 'https://res.cloudinary.com/huypq/image/upload/v1523162344/avatar.png', NULL, NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_post_id` (`postID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_author_id` (`authorID`),
  ADD KEY `fk_category` (`categoryID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_post_id` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`authorID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
