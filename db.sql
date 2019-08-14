-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for mydb
CREATE DATABASE IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;

-- Dumping structure for table mydb.follows
CREATE TABLE IF NOT EXISTS `follows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `follow_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table mydb.follows: ~8 rows (approximately)
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
--INSERT INTO `follows` (`id`, `user_id`, `follow_id`) VALUES
--	(1, 2, 4),
--	(2, 1, 2),
--	(3, 1, 2),
--	(14, 2, 3),
--	(15, 2, 3),
--	(16, 2, 3),
--	(17, 2, 3),
--	(18, 2, 3);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;

-- Dumping structure for table mydb.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table mydb.groups: ~5 rows (approximately)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`id`, `name`) VALUES
	(1, 'group1'),
	(2, 'group2'),
	(3, 'group3'),
	(4, 'group4'),
	(5, 'group5');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Dumping structure for table mydb.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `number_of_followers` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table mydb.users: ~10 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `group_id`, `number_of_followers`) VALUES
	(1, 'adiel', 1, 0),
	(2, 'yosi', 2, 0),
	(3, 'moshe', 3, 10),
	(4, 'avraham', 4, 0),
	(5, 'yakov', 5, 0),
	(6, 'itzahk', 3, 0),
	(7, 'aharon', 2, 0),
	(8, 'shlomo', 5, 0),
	(9, 'yosef', 4, 0),
	(10, 'david', 2, 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
