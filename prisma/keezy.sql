-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 24. 21:25
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `keezy`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `houseimages`
--

CREATE TABLE `houseimages` (
  `idHouseImage` int(11) NOT NULL,
  `houseIdImages` int(11) NOT NULL,
  `url` varchar(191) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `uploadedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `key` varchar(191) NOT NULL,
  `IsProfile` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `houseimages`
--

INSERT INTO `houseimages` (`idHouseImage`, `houseIdImages`, `url`, `deleted`, `uploadedAt`, `key`, `IsProfile`) VALUES
(1, 2, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.124', 'key', 1),
(2, 2, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.128', 'key', 0),
(3, 2, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.130', 'key', 0),
(4, 3, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.132', 'key', 1),
(5, 3, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.134', 'key', 0),
(6, 3, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.135', 'key', 0),
(7, 3, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.137', 'key', 0),
(8, 3, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.139', 'key', 0),
(9, 4, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.140', 'key', 1),
(10, 4, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.142', 'key', 0),
(11, 4, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.144', 'key', 0),
(12, 5, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.145', 'key', 1),
(13, 5, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.147', 'key', 0),
(14, 5, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.148', 'key', 0),
(15, 5, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.150', 'key', 0),
(16, 6, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.152', 'key', 1),
(17, 6, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.153', 'key', 0),
(18, 6, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.154', 'key', 0),
(19, 6, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.156', 'key', 0),
(20, 7, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.159', 'key', 1),
(21, 7, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.161', 'key', 0),
(22, 7, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.163', 'key', 0),
(23, 7, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.166', 'key', 0),
(24, 8, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.168', 'key', 1),
(25, 8, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.170', 'key', 0),
(26, 8, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.172', 'key', 0),
(27, 9, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.174', 'key', 1),
(28, 9, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.175', 'key', 0),
(29, 9, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.177', 'key', 0),
(30, 9, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.178', 'key', 0),
(31, 9, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.180', 'key', 0),
(32, 10, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.181', 'key', 1),
(33, 10, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.182', 'key', 0),
(34, 10, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.183', 'key', 0),
(35, 10, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.184', 'key', 0),
(36, 11, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.186', 'key', 1),
(37, 11, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.187', 'key', 0),
(38, 11, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.189', 'key', 0),
(39, 11, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.191', 'key', 0),
(40, 12, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.193', 'key', 1),
(41, 12, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.195', 'key', 0),
(42, 12, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.196', 'key', 0),
(43, 12, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.198', 'key', 0),
(44, 12, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.199', 'key', 0),
(45, 13, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.201', 'key', 1),
(46, 13, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.202', 'key', 0),
(47, 13, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.204', 'key', 0),
(48, 14, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.205', 'key', 1),
(49, 14, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.206', 'key', 0),
(50, 14, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.208', 'key', 0),
(51, 15, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.210', 'key', 1),
(52, 15, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.211', 'key', 0),
(53, 15, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.213', 'key', 0),
(54, 16, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.215', 'key', 1),
(55, 16, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.217', 'key', 0),
(56, 16, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.219', 'key', 0),
(57, 16, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.221', 'key', 0),
(58, 16, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.222', 'key', 0),
(59, 17, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.224', 'key', 1),
(60, 17, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.225', 'key', 0),
(61, 17, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.226', 'key', 0),
(62, 17, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.452', 'key', 0),
(63, 18, 'http://localhost:9000/test-image/House/H7.jpg', 0, '2026-04-24 19:24:54.453', 'key', 1),
(64, 18, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.455', 'key', 0),
(65, 18, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.457', 'key', 0),
(66, 19, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.460', 'key', 1),
(67, 19, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.462', 'key', 0),
(68, 19, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.463', 'key', 0),
(69, 20, 'http://localhost:9000/test-image/House/H3.jpg', 0, '2026-04-24 19:24:54.465', 'key', 1),
(70, 20, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.466', 'key', 0),
(71, 20, 'http://localhost:9000/test-image/House/H2.jpg', 0, '2026-04-24 19:24:54.468', 'key', 0),
(72, 21, 'http://localhost:9000/test-image/House/H8.jpg', 0, '2026-04-24 19:24:54.469', 'key', 1),
(73, 21, 'http://localhost:9000/test-image/House/H4.jpg', 0, '2026-04-24 19:24:54.470', 'key', 0),
(74, 21, 'http://localhost:9000/test-image/House/H6.jpg', 0, '2026-04-24 19:24:54.471', 'key', 0),
(75, 21, 'http://localhost:9000/test-image/House/H5.jpg', 0, '2026-04-24 19:24:54.472', 'key', 0),
(76, 21, 'http://localhost:9000/test-image/House/H1.jpg', 0, '2026-04-24 19:24:54.474', 'key', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `houselisting`
--

CREATE TABLE `houselisting` (
  `idHouse` int(11) NOT NULL,
  `houseIdUser` int(11) NOT NULL,
  `description` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `rent` double NOT NULL,
  `propertyType` enum('house','flat','skyscraper') NOT NULL,
  `whichFloor` int(11) DEFAULT NULL,
  `numberOfRooms` int(11) NOT NULL,
  `squareMeter` double NOT NULL,
  `heatingType` enum('radiator','airconditioner','convector','floor') NOT NULL,
  `furnishingLevel` enum('none','partial','full') NOT NULL,
  `kitchenLevel` enum('none','partial','full') NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `airConditioner` tinyint(1) NOT NULL,
  `rating` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `houselisting`
--

INSERT INTO `houselisting` (`idHouse`, `houseIdUser`, `description`, `location`, `city`, `rent`, `propertyType`, `whichFloor`, `numberOfRooms`, `squareMeter`, `heatingType`, `furnishingLevel`, `kitchenLevel`, `bathrooms`, `airConditioner`, `rating`) VALUES
(1, 3, '', '', 'Budapest', 90000, 'flat', NULL, 5, 120, 'radiator', 'full', 'full', 2, 0, 0),
(2, 4, 'battle enthusiast, streamer 🧻', '96371 Annabel Roads Suite 459', 'Port Tristin', 296352, 'house', 17, 16, 16.45, 'convector', 'full', 'none', 1, 0, 0),
(3, 7, 'underneath supporter, educator 🌕', '713 Bode Place Apt. 343', 'North Kristy', 496154, 'flat', 20, 23, 98.6, 'airconditioner', 'partial', 'full', 1, 1, 0),
(4, 5, 'dwell advocate, traveler 👽', '38232 Remington Ramp Suite 907', 'Larsoncester', 355259, 'flat', 0, 23, 47.13, 'floor', 'none', 'partial', 1, 1, 0),
(5, 5, 'engineer, teacher, foodie', '47058 Riverside Apt. 274', 'Porterville', 140150, 'skyscraper', 19, 6, 65.07, 'convector', 'partial', 'none', 3, 1, 0),
(6, 12, 'creator, person', '4579 Myriam Fall Apt. 709', 'East Wilhelminefort', 96700, 'skyscraper', 11, 25, 77.56, 'airconditioner', 'partial', 'none', 1, 1, 0),
(7, 9, 'hoof fan, model 🔣', '394 Greenway Suite 687', 'Lake Kolbycester', 462773, 'flat', 10, 6, 33.1, 'convector', 'none', 'none', 3, 1, 0),
(8, 9, 'birdcage fan  💕', '29269 Schowalter Loaf Suite 656', 'East Chad', 366273, 'house', 15, 11, 74.9, 'airconditioner', 'none', 'none', 1, 0, 0),
(9, 8, 'streamer', '78401 Upton Views Apt. 237', 'Fort Amiya', 451417, 'house', 21, 21, 27.85, 'convector', 'full', 'full', 3, 0, 0),
(10, 10, 'mantua lover  🪴', '773 Heidenreich Shoal Apt. 534', 'Boulder', 245919, 'house', 20, 21, 91.01, 'airconditioner', 'full', 'full', 3, 0, 0),
(11, 8, 'haircut fan  🖖🏿', '22987 The Mount Suite 509', 'Fort Shanonport', 337341, 'skyscraper', 22, 23, 15.32, 'convector', 'partial', 'none', 2, 1, 0),
(12, 8, 'author, scientist, model 🚓', '5232 Christian Islands Suite 523', 'South Shayneport', 294101, 'skyscraper', 16, 13, 81.96, 'convector', 'none', 'none', 2, 1, 0),
(13, 11, 'coach, nerd, grad 🥱', '307 South Road Suite 890', 'South Giuseppe', 15282, 'flat', 1, 22, 98.64, 'airconditioner', 'partial', 'partial', 2, 1, 0),
(14, 5, 'geek, coach, model 🛅', '3577 Bertha Hollow Apt. 851', 'Jenastead', 445624, 'flat', 11, 19, 93.57, 'floor', 'none', 'full', 1, 0, 0),
(15, 13, 'luck devotee, artist', '902 Howard Road Apt. 104', 'Framiberg', 142372, 'house', 10, 24, 76.34, 'radiator', 'partial', 'partial', 2, 1, 0),
(16, 11, 'entrepreneur, film lover, veteran', '3608 King Radial Suite 243', 'East Matildeborough', 233813, 'house', 24, 12, 58.4, 'radiator', 'full', 'full', 1, 0, 0),
(17, 8, 'founder, foodie, developer 🧵', '750 Lueilwitz Lake Apt. 262', 'Wolfville', 474833, 'house', 6, 25, 96.64, 'floor', 'full', 'partial', 0, 0, 0),
(18, 9, 'person, educator, film lover', '3996 Jovani Island Suite 948', 'South Raphaelleview', 275588, 'house', 14, 5, 25.64, 'airconditioner', 'none', 'none', 3, 0, 0),
(19, 7, 'expansion lover', '560 Alexander Mall Apt. 895', 'East Houston', 208073, 'house', 1, 14, 77.08, 'floor', 'full', 'partial', 0, 1, 0),
(20, 13, 'leader, streamer', '369 School Close Suite 950', 'Dangeloland', 490882, 'house', 15, 10, 80.4, 'airconditioner', 'full', 'partial', 1, 0, 0),
(21, 8, 'ignorance supporter', '511 S Maple Street Apt. 176', 'North Marceloshire', 436617, 'house', 19, 19, 46.72, 'airconditioner', 'full', 'partial', 2, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `houselistingratings`
--

CREATE TABLE `houselistingratings` (
  `id` int(11) NOT NULL,
  `raterId` int(11) NOT NULL,
  `ratedHouseId` int(11) NOT NULL,
  `ratingScore` int(11) NOT NULL,
  `ratingMessage` varchar(191) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `houselistingratings`
--

INSERT INTO `houselistingratings` (`id`, `raterId`, `ratedHouseId`, `ratingScore`, `ratingMessage`, `approved`, `createdAt`) VALUES
(1, 2, 1, 5, 'Good house', 0, '2026-04-24 19:24:52.712'),
(2, 8, 13, 2, 'Compello adnuo victus abeo demonstro consuasor.', 0, '2026-04-24 19:24:53.956'),
(3, 13, 18, 1, 'Sublime avarus solutio ubi usitas tantillus.', 0, '2026-04-24 19:24:53.957'),
(4, 9, 6, 4, 'Tergeo trepide confugo.', 0, '2026-04-24 19:24:53.959'),
(5, 11, 19, 4, 'Tondeo sub vita vulgus bardus uter cubitum quibusdam claro veritatis.', 0, '2026-04-24 19:24:53.960'),
(6, 11, 4, 4, 'Dedecor aperio texo xiphias cunctatio corroboro ater adduco.', 0, '2026-04-24 19:24:53.961'),
(7, 11, 17, 3, 'Expedita demum beatae pariatur templum spoliatio.', 0, '2026-04-24 19:24:54.023'),
(8, 4, 12, 5, 'Debitis verumtamen vomer desparatus cariosus deputo autus corrumpo defluo.', 0, '2026-04-24 19:24:54.025'),
(9, 4, 21, 5, 'Tum viridis creo adicio voluptatibus soleo decretum tricesimus.', 0, '2026-04-24 19:24:54.027');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `housesearchprefrences`
--

CREATE TABLE `housesearchprefrences` (
  `idHousePrefrences` int(11) NOT NULL,
  `houseSearchIdUser` int(11) NOT NULL,
  `maxRent` double DEFAULT NULL,
  `minSquareMeters` double DEFAULT NULL,
  `minRooms` int(11) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `propertyType` enum('house','flat','skyscraper') DEFAULT NULL,
  `heatingType` enum('radiator','airconditioner','convector','floor') DEFAULT NULL,
  `furnishingLevel` enum('none','partial','full') DEFAULT NULL,
  `kitchenLevel` enum('none','partial','full') DEFAULT NULL,
  `minBathrooms` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `housesearchprefrences`
--

INSERT INTO `housesearchprefrences` (`idHousePrefrences`, `houseSearchIdUser`, `maxRent`, `minSquareMeters`, `minRooms`, `city`, `propertyType`, `heatingType`, `furnishingLevel`, `kitchenLevel`, `minBathrooms`) VALUES
(1, 2, 100000, 100, 3, 'Budapest', 'flat', 'radiator', 'full', 'full', 1),
(2, 4, 224490, 45, 6, 'East Chad', 'house', 'airconditioner', 'partial', 'none', 3),
(3, 5, 248064, 59, 1, 'Wolfville', 'house', 'floor', 'none', 'partial', 2),
(4, 6, 328336, 58, 3, 'South Shayneport', 'skyscraper', 'floor', 'full', 'none', 1),
(5, 7, 235470, 48, 3, 'Porterville', 'flat', 'radiator', 'full', 'partial', 1),
(6, 8, 462664, 13, 7, 'Larsoncester', 'house', 'convector', 'none', 'partial', 1),
(7, 9, 399900, 11, 1, 'South Giuseppe', 'flat', 'airconditioner', 'partial', 'none', 3),
(8, 10, 197725, 28, 4, 'Boulder', 'skyscraper', 'radiator', 'none', 'full', 1),
(9, 11, 166709, 56, 9, 'Dangeloland', 'skyscraper', 'floor', 'partial', 'none', 2),
(10, 12, 298372, 20, 3, 'Wolfville', 'flat', 'airconditioner', 'partial', 'full', 2),
(11, 13, 112539, 29, 6, 'Porterville', 'flat', 'radiator', 'none', 'none', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `likedhouse`
--

CREATE TABLE `likedhouse` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `houseId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `likedhouse`
--

INSERT INTO `likedhouse` (`id`, `userId`, `houseId`, `createdAt`) VALUES
(1, 5, 8, '2026-04-24 19:24:53.919'),
(2, 9, 11, '2026-04-24 19:24:53.923'),
(3, 5, 14, '2026-04-24 19:24:53.926'),
(4, 6, 7, '2026-04-24 19:24:53.928'),
(5, 5, 18, '2026-04-24 19:24:53.930'),
(6, 10, 11, '2026-04-24 19:24:53.932'),
(7, 10, 13, '2026-04-24 19:24:53.934'),
(8, 5, 19, '2026-04-24 19:24:53.936'),
(9, 8, 16, '2026-04-24 19:24:53.938'),
(10, 4, 15, '2026-04-24 19:24:53.940');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `likedroommate`
--

CREATE TABLE `likedroommate` (
  `id` int(11) NOT NULL,
  `likerId` int(11) NOT NULL,
  `likedUserId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `likedroommate`
--

INSERT INTO `likedroommate` (`id`, `likerId`, `likedUserId`, `createdAt`) VALUES
(1, 12, 7, '2026-04-24 19:24:53.755'),
(2, 12, 9, '2026-04-24 19:24:53.763'),
(3, 10, 12, '2026-04-24 19:24:53.766'),
(4, 7, 11, '2026-04-24 19:24:53.768'),
(5, 4, 13, '2026-04-24 19:24:53.770'),
(6, 4, 7, '2026-04-24 19:24:53.773'),
(7, 5, 12, '2026-04-24 19:24:53.775'),
(8, 12, 10, '2026-04-24 19:24:53.778'),
(9, 13, 8, '2026-04-24 19:24:53.781'),
(10, 11, 6, '2026-04-24 19:24:53.784');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roommateratings`
--

CREATE TABLE `roommateratings` (
  `id` int(11) NOT NULL,
  `raterId` int(11) NOT NULL,
  `ratedUserId` int(11) NOT NULL,
  `ratingScore` int(11) NOT NULL,
  `ratingMessage` varchar(191) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `roommateratings`
--

INSERT INTO `roommateratings` (`id`, `raterId`, `ratedUserId`, `ratingScore`, `ratingMessage`, `approved`, `createdAt`) VALUES
(1, 2, 3, 5, 'Good roommate', 0, '2026-04-24 19:24:52.708'),
(2, 7, 9, 1, 'Valeo conforto agnosco.', 0, '2026-04-24 19:24:53.943'),
(3, 12, 9, 4, 'Cilicium curiositas adhuc dolor vilicus cimentarius auditor.', 0, '2026-04-24 19:24:53.944'),
(4, 9, 8, 4, 'Acervus pax decet carpo.', 0, '2026-04-24 19:24:53.946'),
(5, 6, 5, 1, 'Substantia cedo debeo auditor delinquo caecus cibus.', 0, '2026-04-24 19:24:53.947'),
(6, 9, 5, 4, 'Canis celo acies volaticus.', 0, '2026-04-24 19:24:53.949'),
(7, 6, 7, 1, 'Spiculum voro adiuvo dolores cruciamentum fuga vulgivagus tricesimus ducimus tepidus.', 0, '2026-04-24 19:24:53.950'),
(8, 10, 9, 4, 'Tego eaque catena tero aduro crustulum.', 0, '2026-04-24 19:24:53.951'),
(9, 9, 6, 1, 'Deporto asper statim uterque odio.', 0, '2026-04-24 19:24:53.953'),
(10, 8, 5, 2, 'Temptatio ciminatio demo tricesimus.', 0, '2026-04-24 19:24:53.954');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roommatesprefrences`
--

CREATE TABLE `roommatesprefrences` (
  `idRoommatesPrefrences` int(11) NOT NULL,
  `roommatesPrefrencesIdUser` int(11) NOT NULL,
  `minAge` int(11) DEFAULT NULL,
  `maxAge` int(11) DEFAULT NULL,
  `gender` enum('female','male','other','any') DEFAULT NULL,
  `language` enum('English','Hungarian','Spanish','French','German','Polish','Portuguese','Italian','Chinese','Japanese','Korean','Other') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `roommatesprefrences`
--

INSERT INTO `roommatesprefrences` (`idRoommatesPrefrences`, `roommatesPrefrencesIdUser`, `minAge`, `maxAge`, `gender`, `language`) VALUES
(1, 2, 20, 30, 'male', 'English'),
(2, 3, 20, 30, 'male', 'English'),
(3, 4, 20, 52, 'female', 'Other'),
(4, 5, 23, 39, 'male', 'Japanese'),
(5, 6, 17, 42, 'female', 'French'),
(6, 7, 22, 76, 'male', 'Portuguese'),
(7, 8, 21, 44, 'other', 'Italian'),
(8, 9, 18, 68, 'female', 'Italian'),
(9, 10, 21, 47, 'female', 'German'),
(10, 11, 16, 88, 'female', 'Chinese'),
(11, 12, 22, 32, 'other', 'Chinese'),
(12, 13, 24, 91, 'female', 'Chinese');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `userBio` varchar(191) DEFAULT NULL,
  `birthDay` datetime(3) DEFAULT NULL,
  `gender` enum('female','male','other') DEFAULT NULL,
  `language` enum('English','Hungarian','Spanish','French','German','Polish','Portuguese','Italian','Chinese','Japanese','Korean','Other') DEFAULT NULL,
  `occupation` varchar(191) DEFAULT NULL,
  `connectionEmail` varchar(191) DEFAULT NULL,
  `rating` double DEFAULT 0,
  `hasHouse` tinyint(1) NOT NULL DEFAULT 0,
  `lookingForPeople` tinyint(1) NOT NULL DEFAULT 0,
  `lookingForHouse` tinyint(1) NOT NULL DEFAULT 0,
  `role` varchar(191) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`idUser`, `firstName`, `lastName`, `phoneNumber`, `password`, `email`, `userBio`, `birthDay`, `gender`, `language`, `occupation`, `connectionEmail`, `rating`, `hasHouse`, `lookingForPeople`, `lookingForHouse`, `role`) VALUES
(1, 'admin', 'admin', '00000000000', '$argon2id$v=19$m=65536,t=3,p=4$D2eR7yecUXcYkyxA/5zpag$NACyjM0zTpO0+lxNcTkji0eToZEFWm2rnrt3BUjUFjI', 'admin@admin.admin', NULL, '2005-05-04 23:11:25.016', NULL, NULL, NULL, NULL, 0, 1, 1, 1, 'admin'),
(2, 'test01', 'test01', '00000000001', '$argon2id$v=19$m=65536,t=3,p=4$gOCQT7QPhEI947TxOoeNCw$JDON3Krw52qBtNAFct+ceNo5HsljpZbqSkE4lgkp/z8', 't01@t01.t01', 'I am test user 1, looking for roommates.', '2007-11-01 04:05:30.449', 'male', 'English', NULL, NULL, 0, 0, 1, 0, 'user'),
(3, 'test02', 'test02', '00000000002', '$argon2id$v=19$m=65536,t=3,p=4$ZU51gCytXLU+Iie/NYyYHg$GhbJhjw++MAdK+4pMMK+jSLtKHjuvHgPdlDpeJ9fZsY', 't02@gmail.com', 'I am test user 2, looking for roommates.', '1993-11-05 06:19:53.250', 'male', 'English', NULL, NULL, 0, 0, 1, 0, 'user'),
(4, 'Joan', 'Beier', '(645) 716-2997 x40117', '$argon2id$v=19$m=65536,t=3,p=4$c3KWOg1IvaSk/7wtu16VrA$SEnHfy5g6yrlHQNYBQbhgUVR4fnOjAJUH5fjM4+6UUQ', 'Marcelo.McLaughlin62@hotmail.com', 'marathon supporter, student ☮️', '1994-08-14 20:46:47.645', 'other', 'Japanese', 'Investor Security Supervisor', 'Lesly_Beier@yahoo.com', 0, 1, 0, 0, 'user'),
(5, 'Andy', 'Lindgren', '1-863-385-0613 x0897', '$argon2id$v=19$m=65536,t=3,p=4$4PjwipKCiGOp6OQ+JA2RYw$2yvgHsH637NSDikBdXFqxFdfr1cbutzMN3YX4n3gTek', 'Rory46@gmail.com', 'photographer, developer', '1986-04-02 21:59:24.161', 'female', 'Hungarian', 'Internal Functionality Facilitator', 'Kirsten_Abshire99@yahoo.com', 0, 1, 0, 1, 'user'),
(6, 'Daphney', 'Reichel', '1-643-583-0398 x99593', '$argon2id$v=19$m=65536,t=3,p=4$M2KZy6iCCR3niRjScyU0zQ$PYt0PI/qdFh611jYT6fe7SPFQfMXrBl1ntfZ590h8gA', 'Zander.Rempel@hotmail.com', 'coal advocate  🍮', '1945-12-28 07:04:49.369', 'other', 'Italian', 'Central Quality Administrator', 'Bianka.Franecki@hotmail.com', 0, 1, 1, 1, 'user'),
(7, 'Rigoberto', 'Rippin', '507-360-7700 x88749', '$argon2id$v=19$m=65536,t=3,p=4$xAO69V8fyHMlTuCFx/hLRg$eWBbGwDE7Oo51XrJ4+X2HxtDLtwigp83//160LTIoR8', 'Cale.Gleichner@gmail.com', 'lady junkie  🍐', '1994-04-17 17:42:32.424', 'male', 'Chinese', 'Senior Program Manager', 'Timmy_Dietrich@hotmail.com', 0, 1, 0, 0, 'user'),
(8, 'Carli', 'Simonis', '907.287.4369', '$argon2id$v=19$m=65536,t=3,p=4$IpzHCs8yr/5YDsw5BFH6Tg$BVfxU8tFLIwFXSI8e6KlVcKHtkLBxLVbkUdShvExziA', 'Madaline9@hotmail.com', 'horst junkie, friend 🇭🇺', '1946-03-21 17:49:54.326', 'male', 'Polish', 'Global Factors Associate', 'Tanner_Cormier86@gmail.com', 0, 0, 0, 0, 'user'),
(9, 'Clement', 'Dicki', '456.936.1288 x6633', '$argon2id$v=19$m=65536,t=3,p=4$ApjQviDJw6Nc6SfhndmONg$ZEL7n/rEzGRkDRBYZuVFlWtdbvxxMh2+U2CygIByzrY', 'Una.Schimmel@yahoo.com', 'courtroom supporter', '2001-08-03 06:33:57.994', 'other', 'Polish', 'Internal Group Director', 'Colleen32@hotmail.com', 0, 1, 1, 0, 'user'),
(10, 'Clair', 'Spinka', '874-353-9946', '$argon2id$v=19$m=65536,t=3,p=4$dOAL5vMHYftLnS2kpGsnww$o1MhZhWPD939Iz+hxsEh5y1JKCPaViPWJWeeQk2b4xw', 'Oscar_Labadie24@yahoo.com', 'author, dreamer, dreamer 🍮', '1969-02-04 12:55:31.495', 'female', 'Portuguese', 'District Response Assistant', 'Jean_Jacobs4@hotmail.com', 0, 1, 1, 0, 'user'),
(11, 'Alexa', 'Goodwin', '531-369-9641 x2693', '$argon2id$v=19$m=65536,t=3,p=4$N+GZkhAh7PIZ7fddL+Dd2w$ovmJWYxt8Yv3JHrB8m7bVUHvl3YtAN/AXFPUHJOTrBY', 'Christy93@yahoo.com', 'poppy supporter, activist 🐘', '1974-08-27 17:08:48.404', 'female', 'Polish', 'Forward Markets Director', 'Giovani.Cartwright99@hotmail.com', 0, 0, 0, 1, 'user'),
(12, 'Frederik', 'Tillman', '769.497.1497 x271', '$argon2id$v=19$m=65536,t=3,p=4$Q+XsLgw0BZZuGXByziMfKA$YIcv8AOhTC5OfdPabVE+FFWQX08HVE9/Ot0S9Czwt/w', 'Christina_Pfannerstill36@hotmail.com', 'tooth fan', '1950-02-23 06:07:52.704', 'other', 'German', 'Customer Functionality Facilitator', 'Cesar_Runolfsson21@hotmail.com', 0, 0, 1, 0, 'user'),
(13, 'Jerald', 'Hansen', '(650) 332-6310', '$argon2id$v=19$m=65536,t=3,p=4$9EoB5GlpN+x9E8qjclXHgg$zcNPjDZYxsxLEVd6diK3M5glT1KFpsuAUo/BZmwIhfk', 'Lucius.Hessel14@yahoo.com', 'waterspout supporter', '1954-05-25 06:30:03.826', 'female', 'Chinese', 'Product Quality Supervisor', 'General.Gorczany@yahoo.com', 0, 0, 1, 0, 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userimages`
--

CREATE TABLE `userimages` (
  `id` int(11) NOT NULL,
  `userIdImages` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `IsProfile` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `url` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `userimages`
--

INSERT INTO `userimages` (`id`, `userIdImages`, `key`, `IsProfile`, `deleted`, `url`, `createdAt`) VALUES
(1, 4, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/f4.jpg', '2026-04-24 19:24:54.028'),
(2, 4, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.032'),
(3, 4, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f3.jpg', '2026-04-24 19:24:54.034'),
(4, 5, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/L4.jpg', '2026-04-24 19:24:54.039'),
(5, 5, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f5.jpg', '2026-04-24 19:24:54.041'),
(6, 5, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.042'),
(7, 5, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L2.jpg', '2026-04-24 19:24:54.043'),
(8, 5, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f1.jpg', '2026-04-24 19:24:54.045'),
(9, 6, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.046'),
(10, 6, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.048'),
(11, 6, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f4.jpg', '2026-04-24 19:24:54.049'),
(12, 6, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.051'),
(13, 6, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L2.jpg', '2026-04-24 19:24:54.052'),
(14, 7, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/f1.jpg', '2026-04-24 19:24:54.054'),
(15, 7, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f4.jpg', '2026-04-24 19:24:54.056'),
(16, 7, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.057'),
(17, 7, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.059'),
(18, 8, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.062'),
(19, 8, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.064'),
(20, 8, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L2.jpg', '2026-04-24 19:24:54.066'),
(21, 9, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/L2.jpg', '2026-04-24 19:24:54.069'),
(22, 9, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f1.jpg', '2026-04-24 19:24:54.072'),
(23, 9, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f5.jpg', '2026-04-24 19:24:54.078'),
(24, 9, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L4.jpg', '2026-04-24 19:24:54.080'),
(25, 10, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.083'),
(26, 10, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L5.jpg', '2026-04-24 19:24:54.085'),
(27, 10, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L4.jpg', '2026-04-24 19:24:54.087'),
(28, 10, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.089'),
(29, 10, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.090'),
(30, 11, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/f3.jpg', '2026-04-24 19:24:54.093'),
(31, 11, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f4.jpg', '2026-04-24 19:24:54.095'),
(32, 11, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.097'),
(33, 11, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f5.jpg', '2026-04-24 19:24:54.098'),
(34, 11, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.101'),
(35, 12, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/L5.jpg', '2026-04-24 19:24:54.104'),
(36, 12, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f4.jpg', '2026-04-24 19:24:54.106'),
(37, 12, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.108'),
(38, 12, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f3.jpg', '2026-04-24 19:24:54.111'),
(39, 12, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f5.jpg', '2026-04-24 19:24:54.113'),
(40, 13, 'key', 1, 0, 'http://localhost:9000/test-image/Profil/L3.jpg', '2026-04-24 19:24:54.116'),
(41, 13, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/f2.jpg', '2026-04-24 19:24:54.118'),
(42, 13, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L5.jpg', '2026-04-24 19:24:54.120'),
(43, 13, 'key', 0, 0, 'http://localhost:9000/test-image/Profil/L1.jpg', '2026-04-24 19:24:54.122');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `usertoken`
--

CREATE TABLE `usertoken` (
  `idUserToken` int(11) NOT NULL,
  `userIdToken` int(11) NOT NULL,
  `token` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `usertoken`
--

INSERT INTO `usertoken` (`idUserToken`, `userIdToken`, `token`) VALUES
(1, 1, 'admintoken'),
(2, 2, 'test01token'),
(3, 2, 't1'),
(4, 3, 'test02token'),
(5, 7, '37abf928-be31-41de-aee7-9b3a99cd3861'),
(6, 4, '9f9972c5-88da-4327-807d-55e2dffa75ec'),
(7, 5, '4028ceb8-7a9a-4615-ac01-b320733a011a'),
(8, 8, '09687058-2fd6-44f6-b50f-179d2d8ba414'),
(9, 12, 'fbfc54b8-7235-4c3c-a987-5ea197da3af3'),
(10, 11, '1da2f886-a655-4097-b9e6-c3a774dd059b'),
(11, 11, 'f48348e8-d472-42ab-a3b0-2e2ab0175a40'),
(12, 6, '001852ae-e5f7-4d08-abdb-ab5595b50ea5'),
(13, 8, 'c22f4921-a2bd-4824-8720-0302c50b3b7c'),
(14, 6, '44fee2e8-151f-4a85-af1e-ee5d050037fe');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `houseimages`
--
ALTER TABLE `houseimages`
  ADD PRIMARY KEY (`idHouseImage`),
  ADD KEY `HouseImages_houseIdImages_fkey` (`houseIdImages`);

--
-- A tábla indexei `houselisting`
--
ALTER TABLE `houselisting`
  ADD PRIMARY KEY (`idHouse`),
  ADD KEY `HouseListing_houseIdUser_fkey` (`houseIdUser`);

--
-- A tábla indexei `houselistingratings`
--
ALTER TABLE `houselistingratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HouseListingRatings_raterId_ratedHouseId_key` (`raterId`,`ratedHouseId`),
  ADD KEY `HouseListingRatings_ratedHouseId_fkey` (`ratedHouseId`);

--
-- A tábla indexei `housesearchprefrences`
--
ALTER TABLE `housesearchprefrences`
  ADD PRIMARY KEY (`idHousePrefrences`),
  ADD UNIQUE KEY `HouseSearchPrefrences_houseSearchIdUser_key` (`houseSearchIdUser`);

--
-- A tábla indexei `likedhouse`
--
ALTER TABLE `likedhouse`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `LikedHouse_userId_houseId_key` (`userId`,`houseId`),
  ADD KEY `LikedHouse_houseId_fkey` (`houseId`);

--
-- A tábla indexei `likedroommate`
--
ALTER TABLE `likedroommate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `LikedRoommate_likerId_likedUserId_key` (`likerId`,`likedUserId`),
  ADD KEY `LikedRoommate_likedUserId_fkey` (`likedUserId`);

--
-- A tábla indexei `roommateratings`
--
ALTER TABLE `roommateratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `RoommateRatings_raterId_ratedUserId_key` (`raterId`,`ratedUserId`),
  ADD KEY `RoommateRatings_ratedUserId_fkey` (`ratedUserId`);

--
-- A tábla indexei `roommatesprefrences`
--
ALTER TABLE `roommatesprefrences`
  ADD PRIMARY KEY (`idRoommatesPrefrences`),
  ADD UNIQUE KEY `RoommatesPrefrences_roommatesPrefrencesIdUser_key` (`roommatesPrefrencesIdUser`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- A tábla indexei `userimages`
--
ALTER TABLE `userimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserImages_userIdImages_fkey` (`userIdImages`);

--
-- A tábla indexei `usertoken`
--
ALTER TABLE `usertoken`
  ADD PRIMARY KEY (`idUserToken`),
  ADD UNIQUE KEY `UserToken_token_key` (`token`),
  ADD KEY `UserToken_userIdToken_fkey` (`userIdToken`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `houseimages`
--
ALTER TABLE `houseimages`
  MODIFY `idHouseImage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT a táblához `houselisting`
--
ALTER TABLE `houselisting`
  MODIFY `idHouse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `houselistingratings`
--
ALTER TABLE `houselistingratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `housesearchprefrences`
--
ALTER TABLE `housesearchprefrences`
  MODIFY `idHousePrefrences` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `likedhouse`
--
ALTER TABLE `likedhouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `likedroommate`
--
ALTER TABLE `likedroommate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `roommateratings`
--
ALTER TABLE `roommateratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `roommatesprefrences`
--
ALTER TABLE `roommatesprefrences`
  MODIFY `idRoommatesPrefrences` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `userimages`
--
ALTER TABLE `userimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `usertoken`
--
ALTER TABLE `usertoken`
  MODIFY `idUserToken` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `houseimages`
--
ALTER TABLE `houseimages`
  ADD CONSTRAINT `HouseImages_houseIdImages_fkey` FOREIGN KEY (`houseIdImages`) REFERENCES `houselisting` (`idHouse`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `houselisting`
--
ALTER TABLE `houselisting`
  ADD CONSTRAINT `HouseListing_houseIdUser_fkey` FOREIGN KEY (`houseIdUser`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `houselistingratings`
--
ALTER TABLE `houselistingratings`
  ADD CONSTRAINT `HouseListingRatings_ratedHouseId_fkey` FOREIGN KEY (`ratedHouseId`) REFERENCES `houselisting` (`idHouse`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `HouseListingRatings_raterId_fkey` FOREIGN KEY (`raterId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `housesearchprefrences`
--
ALTER TABLE `housesearchprefrences`
  ADD CONSTRAINT `HouseSearchPrefrences_houseSearchIdUser_fkey` FOREIGN KEY (`houseSearchIdUser`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `likedhouse`
--
ALTER TABLE `likedhouse`
  ADD CONSTRAINT `LikedHouse_houseId_fkey` FOREIGN KEY (`houseId`) REFERENCES `houselisting` (`idHouse`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LikedHouse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `likedroommate`
--
ALTER TABLE `likedroommate`
  ADD CONSTRAINT `LikedRoommate_likedUserId_fkey` FOREIGN KEY (`likedUserId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LikedRoommate_likerId_fkey` FOREIGN KEY (`likerId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `roommateratings`
--
ALTER TABLE `roommateratings`
  ADD CONSTRAINT `RoommateRatings_ratedUserId_fkey` FOREIGN KEY (`ratedUserId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RoommateRatings_raterId_fkey` FOREIGN KEY (`raterId`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `roommatesprefrences`
--
ALTER TABLE `roommatesprefrences`
  ADD CONSTRAINT `RoommatesPrefrences_roommatesPrefrencesIdUser_fkey` FOREIGN KEY (`roommatesPrefrencesIdUser`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `userimages`
--
ALTER TABLE `userimages`
  ADD CONSTRAINT `UserImages_userIdImages_fkey` FOREIGN KEY (`userIdImages`) REFERENCES `user` (`idUser`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `usertoken`
--
ALTER TABLE `usertoken`
  ADD CONSTRAINT `UserToken_userIdToken_fkey` FOREIGN KEY (`userIdToken`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
