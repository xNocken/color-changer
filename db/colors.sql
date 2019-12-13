-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 11. Okt 2019 um 12:18
-- Server-Version: 10.3.16-MariaDB
-- PHP-Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `colors`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `r` varchar(45) DEFAULT NULL,
  `g` varchar(45) DEFAULT NULL,
  `b` varchar(45) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `user` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `user` varchar(16) NOT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `security_question` VARCHAR(200) NULL,
  `security_answer` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);
COMMIT;

ALTER TABLE `themes`
  CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;


ALTER TABLE `users`
  ADD PRIMARY KEY (`user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
