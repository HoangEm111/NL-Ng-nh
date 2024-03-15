CREATE DATABASE  IF NOT EXISTS `healpro` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `healpro`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: healpro
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chitietdonhang` (
  `maSP` int(11) NOT NULL,
  `maDH` int(11) NOT NULL,
  `soLuongSP` int(11) DEFAULT NULL,
  PRIMARY KEY (`maSP`,`maDH`),
  KEY `fk_idDH_idx` (`maDH`),
  CONSTRAINT `fk_idDH` FOREIGN KEY (`maDH`) REFERENCES `donhang` (`madh`),
  CONSTRAINT `fk_idSP` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`masp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chitietgiohang`
--

DROP TABLE IF EXISTS `chitietgiohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chitietgiohang` (
  `maGH` int(11) NOT NULL,
  `maSP` int(11) NOT NULL,
  `soluongSP` int(11) DEFAULT NULL,
  PRIMARY KEY (`maGH`,`maSP`),
  KEY `fk_idSP_idx` (`maSP`),
  CONSTRAINT `fk_idGH` FOREIGN KEY (`maGH`) REFERENCES `giohang` (`magh`),
  CONSTRAINT `fk_maSP` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`masp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `danhgia`
--

DROP TABLE IF EXISTS `danhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `danhgia` (
  `maDG` int(11) NOT NULL AUTO_INCREMENT,
  `binhLuan` longtext,
  `mucDanhGia` int(11) DEFAULT NULL,
  `maSP` int(11) DEFAULT NULL,
  `maTK` int(11) DEFAULT NULL,
  PRIMARY KEY (`maDG`),
  KEY `fk_DG_idSP_idx` (`maSP`),
  KEY `fk_DG_idTK_idx` (`maTK`),
  CONSTRAINT `fk_DG_idSP` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`masp`),
  CONSTRAINT `fk_DG_idTK` FOREIGN KEY (`maTK`) REFERENCES `taikhoan` (`matk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `donhang` (
  `maDH` int(11) NOT NULL AUTO_INCREMENT,
  `ngayDat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tongTien` float DEFAULT NULL,
  `tinhTrangThanhToan` tinyint(4) DEFAULT NULL,
  `maKH` int(11) DEFAULT NULL,
  `phuongthucthanhtoan` int(11) DEFAULT NULL,
  `tinhtrangdonhang` int(11) DEFAULT NULL,
  PRIMARY KEY (`maDH`),
  KEY `fk_idKH_idx` (`maKH`),
  KEY `fk_idTT_idx` (`tinhtrangdonhang`),
  KEY `fk_idPT_idx` (`phuongthucthanhtoan`),
  CONSTRAINT `fk_idKH` FOREIGN KEY (`maKH`) REFERENCES `khachhang` (`makh`),
  CONSTRAINT `fk_idPT` FOREIGN KEY (`phuongthucthanhtoan`) REFERENCES `phuongthucthanhtoan` (`id`),
  CONSTRAINT `fk_idTT` FOREIGN KEY (`tinhtrangdonhang`) REFERENCES `tinhtrangdonhang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `giohang` (
  `maGH` int(11) NOT NULL AUTO_INCREMENT,
  `tongTien` float DEFAULT NULL,
  `maKH` int(11) DEFAULT NULL,
  PRIMARY KEY (`maGH`),
  KEY `fk_GH_KH_idx` (`maKH`),
  CONSTRAINT `fk_GH_KH` FOREIGN KEY (`maKH`) REFERENCES `khachhang` (`makh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hangsanxuat`
--

DROP TABLE IF EXISTS `hangsanxuat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hangsanxuat` (
  `maHSX` int(11) NOT NULL AUTO_INCREMENT,
  `tenHSX` varchar(45) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`maHSX`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hinhanh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) DEFAULT NULL,
  `maSP` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_HA_idSP_idx` (`maSP`),
  CONSTRAINT `fk_HA_idSP` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`masp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `khachhang` (
  `maKH` int(11) NOT NULL AUTO_INCREMENT,
  `hoten` varchar(45) DEFAULT NULL,
  `diachi` varchar(255) DEFAULT NULL,
  `gioitinh` int(11) DEFAULT NULL,
  `namsinh` int(11) DEFAULT NULL,
  `sodienthoai` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`maKH`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `loaisanpham` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenLoai` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phuongthucthanhtoan`
--

DROP TABLE IF EXISTS `phuongthucthanhtoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `phuongthucthanhtoan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phuongthuc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sanpham` (
  `maSP` int(11) NOT NULL AUTO_INCREMENT,
  `tenSP` varchar(255) DEFAULT NULL,
  `giaBan` float DEFAULT NULL,
  `NSX` datetime DEFAULT NULL,
  `HSD` datetime DEFAULT NULL,
  `soLuongCon` int(11) DEFAULT NULL,
  `moTa` longtext,
  `daBan` int(11) DEFAULT NULL,
  `maHSX` int(11) DEFAULT NULL,
  `maLoai` int(11) DEFAULT NULL,
  `anhdaidien` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`maSP`),
  KEY `fk_idloai_idx` (`maLoai`),
  KEY `fk_idhang_idx` (`maHSX`),
  CONSTRAINT `fk_idhang` FOREIGN KEY (`maHSX`) REFERENCES `hangsanxuat` (`mahsx`),
  CONSTRAINT `fk_idloai` FOREIGN KEY (`maLoai`) REFERENCES `loaisanpham` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `taikhoan` (
  `maTK` int(11) NOT NULL AUTO_INCREMENT,
  `soDienThoai` varchar(45) DEFAULT NULL,
  `matKhau` varchar(45) DEFAULT NULL,
  `vaiTro` int(11) DEFAULT NULL,
  `maKH` int(11) DEFAULT NULL,
  PRIMARY KEY (`maTK`),
  KEY `fk_TK_KH_idx` (`maKH`),
  CONSTRAINT `fk_TK_KH` FOREIGN KEY (`maKH`) REFERENCES `khachhang` (`makh`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tinhtrangdonhang`
--

DROP TABLE IF EXISTS `tinhtrangdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tinhtrangdonhang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tinhtrang` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 19:09:52
