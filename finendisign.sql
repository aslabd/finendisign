-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02 Feb 2019 pada 20.04
-- Versi Server: 10.1.25-MariaDB
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
-- Database: `finendisign`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `priorities` int(11) NOT NULL,
  `description` text,
  `status` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `priorities`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `version`) VALUES
(1, 'Illustration', 1, 'All illustrations that I made', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(2, 'Logo', 2, 'All logos that I made', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(3, 'Photograph', 3, 'All photograph that I took', 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `configurations`
--

CREATE TABLE `configurations` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `configurations`
--

INSERT INTO `configurations` (`id`, `key`, `value`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `version`) VALUES
(1, 'home-background', 'https://i.pinimg.com/originals/35/65/a8/3565a86a038acd35f6e4cbd9493a706e.jpg', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` tinytext NOT NULL,
  `postId` int(11) NOT NULL,
  `isThumbnail` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `images`
--

INSERT INTO `images` (`id`, `url`, `postId`, `isThumbnail`, `createdAt`, `updatedAt`, `deletedAt`, `version`) VALUES
(1, 'https://s3-eu-west-1.amazonaws.com/froala-eu/temp_files%2F1545674609809-background-brick-wall-bricks-259915.jpg', 1, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(2, 'https://www.froala.com/assets/editor/media_files/photo4.jpg', 1, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(3, 'https://www.froala.com/assets/editor/media_files/photo5.jpg', 1, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(4, 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg', 2, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(5, 'https://www.tourmaui.com/wp-content/uploads/Sunset-from-Haleakala.jpg', 2, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(6, 'https://lonelyplanetwpnews.imgix.net/2018/04/sunset-Slovenia.jpg', 2, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(7, 'https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/dki-jakarta/Image1.jpg', 3, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(8, 'https://asialink.unimelb.edu.au/__data/assets/image/0009/2186667/Jakarta.jpg', 3, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(9, 'https://1nsw6u.akamaized.net/application/files/3114/7279/2041/jakarta-destination.jpg', 3, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(10, 'https://i.ytimg.com/vi/2yKsDZrEF7U/maxresdefault.jpg', 4, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(11, 'https://i.pinimg.com/originals/35/65/a8/3565a86a038acd35f6e4cbd9493a706e.jpg', 4, 0, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(12, 'https://i.pinimg.com/originals/19/bf/1e/19bf1e8c8cba1a299911274196c5677b.jpg', 4, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(22, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_91196313-e1531894296949.png', 12, 1, '2019-01-13 15:39:44', '2019-01-13 15:39:44', NULL, 0),
(23, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_88530203-e1531899580234.jpg', 12, 0, '2019-01-13 15:39:44', '2019-01-13 15:39:44', NULL, 0),
(24, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_92198640-e1531894277853.jpg', 12, 0, '2019-01-13 15:39:44', '2019-01-13 15:39:44', NULL, 0),
(25, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_91196313-e1531894296949.png', 13, 1, '2019-01-13 15:39:54', '2019-01-13 15:39:54', NULL, 0),
(26, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_88530203-e1531899580234.jpg', 13, 0, '2019-01-13 15:39:54', '2019-01-13 15:39:54', NULL, 0),
(27, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_92198640-e1531894277853.jpg', 13, 0, '2019-01-13 15:39:54', '2019-01-13 15:39:54', NULL, 0),
(28, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_91196313-e1531894296949.png', 14, 1, '2019-01-13 15:40:09', '2019-01-13 15:40:09', NULL, 0),
(29, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_88530203-e1531899580234.jpg', 14, 0, '2019-01-13 15:40:09', '2019-01-13 15:40:09', NULL, 0),
(30, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_92198640-e1531894277853.jpg', 14, NULL, '2019-01-13 15:40:09', '2019-01-13 15:40:09', NULL, 0),
(31, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_91196313-e1531894296949.png', 16, 1, '2019-01-13 16:48:05', '2019-01-13 16:48:05', NULL, 0),
(32, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_88530203-e1531899580234.jpg', 16, 0, '2019-01-13 16:48:05', '2019-01-13 16:48:05', NULL, 0),
(33, 'https://99designs-blog.imgix.net/wp-content/uploads/2018/07/attachment_92198640-e1531894277853.jpg', 16, NULL, '2019-01-13 16:48:05', '2019-01-13 16:48:05', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `description` text,
  `authorId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `authorId`, `categoryId`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `version`) VALUES
(1, 'Hanya Asal Saja', 'Apapun Ada Disini', 1, 1, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(2, 'Senja', 'Langit Oranye di Sore Hari', 1, 1, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(3, 'Inilah Jakarta', 'Main-Main ke Ibukota', 1, 1, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(4, 'Darkness', 'Lonely in the Dark', 1, 1, 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(12, 'Logo', 'Logo Apa Saja', 1, 2, 1, '2019-01-13 15:39:44', '2019-01-13 15:39:44', NULL, 0),
(13, 'Logo', 'Logo Apa Saja', 1, 10, 1, '2019-01-13 15:39:54', '2019-01-13 15:39:54', NULL, 0),
(14, 'Logo', 'Logo Apa Saja', 1, 10, 1, '2019-01-13 15:40:09', '2019-01-13 15:40:09', NULL, 0),
(15, 'Logo', 'Logo Apa Saja', 1, 10, 1, '2019-01-13 15:41:49', '2019-01-13 15:41:49', '2019-01-13 15:41:49', 0),
(16, 'Logo', 'Logo Apa Saja', 1, 10, 1, '2019-01-13 16:48:05', '2019-01-13 16:48:05', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `role` enum('super','admin') DEFAULT 'admin',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `version` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `version`) VALUES
(1, 'Muhammad Aslam Abdurrohim', 'aslamabdurrohim', 'aslamabdurrohim@gmail.com', 'c557806bfe65c8a58fc1e5d492b61b8dac5cfc05f33fcd434cbb5540bd9c7a97', 'super', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(2, 'Muhammad Aslam Abdurrohim', 'm.aslam.abdurrohim', 'm.aslam.abdurrohim@gmail.com', '218fc46f3f76525355addeb327aae02ea3203dd57cea7ae0fa699116be717ad1', 'admin', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(3, 'Miqdad Abdurrahman Fawwaz', 'miqdad.fawwaz', 'miqdad.fawwaz@gmail.com', '1a0a4a7ad60f09d9855dd884ad402633c50de6585f470e0fd1c6c04b3e1f2161', 'admin', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0),
(4, 'Finendi', 'finendi', 'finendi@finendisign.com', '2abc5acbaead3205dcec0fd719cda993f8f04b871fbe2c2f07152b657076f6c4', 'super', 1, '2018-12-30 17:55:06', '2018-12-30 17:55:06', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
