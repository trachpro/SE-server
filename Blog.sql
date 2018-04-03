-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 03, 2018 at 05:03 PM
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
(1, 2, 6, 'test', '0000-00-00 00:00:00', NULL, NULL, 1),
(2, 2, 6, 'bbbb', '0000-00-00 00:00:00', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `ID` int(10) NOT NULL,
  `authorID` int(10) NOT NULL,
  `title` text,
  `content` text,
  `categoryID` int(5) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `editedAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `status` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`ID`, `authorID`, `title`, `content`, `categoryID`, `createdAt`, `editedAt`, `deletedAt`, `status`) VALUES
(1, 6, 'Lorem Ipsum', 'Now any of your Google Home devices can connect to other Bluetooth speakers so you can control your entertainment experience simply using the sound of your voice. Turn up the beats in the living room, listen to a podcast while you cook or finish a few chapters of your audiobook before bed—even in rooms that don’t have a Google device.', 1, '0000-00-00', '2018-04-02', '0000-00-00', 1),
(2, 6, 'Rolling Study Halls: turning bus time into learning time', 'huyyyyyyyyyyy', 1, '2018-04-02', '2018-04-03', NULL, 1);

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
  `activationCode` varchar(40) DEFAULT NULL,
  `profilePicture` varchar(256) DEFAULT NULL,
  `forgottenPasswordCode` varchar(40) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `name`, `password`, `email`, `activationCode`, `profilePicture`, `forgottenPasswordCode`, `createdAt`, `deletedAt`, `status`) VALUES
(6, 'admin', 'huy', '12345', 'huypq@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
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
