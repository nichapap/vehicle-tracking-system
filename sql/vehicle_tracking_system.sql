-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 21, 2022 at 03:20 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_tracking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `coordinates`
--

CREATE TABLE `coordinates` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `recorded_date` date NOT NULL,
  `latitude` decimal(11,7) NOT NULL,
  `longitude` decimal(11,7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `coordinates`
--

INSERT INTO `coordinates` (`id`, `vehicle_id`, `recorded_date`, `latitude`, `longitude`) VALUES
(1, 1234567, '2022-01-16', '13.7773063', '100.5842361'),
(2, 1234567, '2022-01-17', '13.7758865', '100.5872368'),
(3, 5678910, '2022-01-01', '2.2223450', '10.4564700'),
(4, 5678910, '2022-01-01', '2.2223450', '10.4564700'),
(5, 5678910, '2022-01-01', '2.2223450', '10.4564700'),
(6, 5678910, '2022-01-17', '2.2223450', '10.4564700'),
(7, 667788, '2022-01-20', '2.2223450', '10.4564700'),
(8, 667788, '2022-01-10', '2.2223450', '10.4564700'),
(9, 667788, '2022-01-20', '2.2223450', '10.4564700'),
(10, 667788, '2022-01-19', '2.2223450', '10.4564700');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicle_id`) VALUES
(7, 667788),
(1, 1234567),
(9, 5678910),
(3, 9876543),
(4, 9898989),
(5, 1212312121);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicle_id` (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coordinates`
--
ALTER TABLE `coordinates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coordinates`
--
ALTER TABLE `coordinates`
  ADD CONSTRAINT `coordinates_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
