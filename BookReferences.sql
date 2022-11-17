-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Nov 17, 2022 at 05:39 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12561563`
--

-- --------------------------------------------------------

--
-- Table structure for table `BookReferences`
--

CREATE TABLE `BookReferences` (
  `reference_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `book_reference_name` varchar(255) NOT NULL,
  `book_reference_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BookReferences`
--

INSERT INTO BookReferences (book_id, book_reference_name, book_reference_link) VALUES
(4, 'Gate Smashers', 'https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p'),
(4, 'Neso Academy', 'https://youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O'),
(10, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i'),
(10, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev'),
(15, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT'),
(15, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPd1Y'),
(15, 'Jenny Lecture', 'https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU'),
(15, 'Kunal Kushwaha', 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'),
(15, 'FreeCodeCamp', 'https://www.youtube.com/watch?v=zg9ih6SVACc&t=10015s'),
(1, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa'),
(1, 'Abdul Bari', 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O'),
(1, 'MIT OpenCourseWare', 'https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw3oGp'),
(1, 'Space & Time Complexity', 'https://www.youtube.com/watch?v=mV3wrLBbuuE&list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ&index=24&t=6960s'),
(5, 'Kunal Kushwaha', 'https://www.youtube.com/watch?v=IPvYjXCsTg8&t=1680s'),
(5, 'Gate Smashers', 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_'),
(5, 'Neso Academy', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx'),
(8, 'Digital Electronics', 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm'),
(8, 'Bharat Acharya(Recommended)', 'https://www.youtube.com/playlist?list=PLWSi8b2bBhm7bKvNPOln-sghqiHUcnH7V'),
(3, 'Dr. Gajendra Purohit', 'https://www.youtube.com/playlist?list=PLU6SqdYcYsfLRq3tu-g_hvkHDcorrtcBK'),
(3, 'Byjus(Recommended)', 'https://www.youtube.com/playlist?list=PLhLZ_zxDsyOIKbQfKFM05BLYRhUZ7JP-M'),
(3, 'Bayes  Theorem', 'https://www.youtube.com/watch?v=hHTbXAhLlQQ&t=6s');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BookReferences`
--
ALTER TABLE `BookReferences`
  ADD PRIMARY KEY (`reference_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BookReferences`
--
ALTER TABLE `BookReferences`
  MODIFY `reference_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
