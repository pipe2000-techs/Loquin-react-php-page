-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2022 a las 03:14:07
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `user_react`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userreact`
--

CREATE TABLE `userreact` (
  `id_user` int(11) NOT NULL,
  `userName_user` varchar(100) DEFAULT NULL,
  `name_user` varchar(100) DEFAULT NULL,
  `age_user` int(11) DEFAULT NULL,
  `photo_user` varchar(500) DEFAULT NULL,
  `password_user` varchar(500) DEFAULT NULL,
  `DateCreate_user` date DEFAULT NULL,
  `DateUpdate_user` date DEFAULT NULL,
  `email_user` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `userreact`
--

INSERT INTO `userreact` (`id_user`, `userName_user`, `name_user`, `age_user`, `photo_user`, `password_user`, `DateCreate_user`, `DateUpdate_user`, `email_user`) VALUES
(1, 'pipe2000', 'Andres gonzalez', 20, '1668215074_aaaa.jpg', 'djtZwWOZeoZasa1LyHWrNg==', '2022-11-01', '2022-11-11', 'andres.gonzalezp@cun.edu.co'),
(191, 'pepe', 'Andres gonzalez', 55, '1668215113_kakashi-hatake-ilustracion_7680x4320_xtrafondos.com.jpg', 'VjcGathKbGueDy9Zj6suaQ==', '2022-11-11', NULL, 'andrespino2000@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `userreact`
--
ALTER TABLE `userreact`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `userreact`
--
ALTER TABLE `userreact`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
