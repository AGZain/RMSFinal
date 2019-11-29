-- MariaDB dump 10.17  Distrib 10.4.10-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: retail_store
-- ------------------------------------------------------
-- Server version	10.4.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `Fname` varchar(45) DEFAULT NULL,
  `Minit` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `Ssn` varchar(45) DEFAULT NULL,
  `Bdate` varchar(45) DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `Gender` varchar(45) DEFAULT NULL,
  `Salary` int(11) DEFAULT NULL,
  `Employee_no` int(11) NOT NULL,
  `Admin` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT 'password',
  PRIMARY KEY (`Employee_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('admin','a','admin','123','11-10-1974','123 any street, Scarborough, ON','M',21000,123,'Y','new passowrd'),('Barry','H','Allen','100251234','11-10-1974','54 Markham Road, Scarborough, ON','M',21000,1000,'Y','password'),('Iris','J','West','100355678','12-18-1970','236 Eglinton Road, Scarborough, ON','F',20000,1005,'Y','password'),('Caitlin','F','Snow','100459012','05-08-1995','12 Brock Street, Ajax, ON','F',15000,1010,'N','password'),('Cecile','M','Horton','100153456','06-08-1992','498 Simcoe Street, Oshawa, ON','F',14000,1015,'N','password'),('Nora','W','Aryan','100257890','02-22-1982','36 Colin Drive, Scarborough, ON','M',17000,1020,'N','password'),('Kendra','C','Saunders','100750147','09-03-1987','41 Beachgrove Lane, Markham, ON','F',19000,1025,'N','password'),('Cisco','J','Ramon','100650258','04-17-1992','75 Jane Street, Toronto, ON','F',21000,1030,'Y','password'),('Ralph','E','Dibny','100450369','06-11-1991','61 Bellamy Road, Scarborough, ON','M',90000,1035,'N','password'),('Harrison ','E ','Wells','100650159','09-13-1980','82 Jenmat Drive, Markham, ON','M',21100,1040,'N','password'),('Joe','S','Westin','100650357','02-20-1977','19 Miller Street, Toronto, ON','M',87000,1045,'Y','password');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `Item_no` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Unit_price` decimal(30,2) DEFAULT NULL,
  PRIMARY KEY (`Item_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (16,'Milk',118,4.47),(23,'Butter',286,6.87),(29,'Bread',179,2.47),(36,'Orange Juice',153,5.97),(41,'Strawberry Jam',247,3.97),(51,'Shampoo',249,6.97),(62,'Socks',845,10.97),(73,'Candle',527,24.57),(77,'Chips',30,2.99),(89,'Blanket',563,29.97),(91,'Cereal',89,1.70),(97,'Scarf',417,13.47),(99,'99',5,5.60),(123,'123',99,1.99),(289,'Bob2',111,90.00),(1111,'Bob2',111,90.00);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_sold`
--

DROP TABLE IF EXISTS `items_sold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items_sold` (
  `item_no` int(11) NOT NULL,
  `transaction_num` int(11) NOT NULL,
  `unit_price` decimal(30,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_price` decimal(30,2) DEFAULT NULL,
  PRIMARY KEY (`item_no`,`transaction_num`),
  CONSTRAINT `ItemNum` FOREIGN KEY (`item_no`) REFERENCES `inventory` (`Item_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_sold`
--

LOCK TABLES `items_sold` WRITE;
/*!40000 ALTER TABLE `items_sold` DISABLE KEYS */;
INSERT INTO `items_sold` VALUES (16,20086,4.97,3,14.91),(16,20109,4.47,56,250.32),(16,20110,4.47,56,250.32),(16,20111,4.47,56,250.32),(16,20112,4.47,56,250.32),(16,20113,4.47,56,250.32),(16,20114,4.47,56,250.32),(16,20115,4.47,56,250.32),(16,20116,4.47,3,13.41),(16,20117,4.47,2,8.94),(16,20118,4.47,1,4.47),(16,20119,4.47,2,8.94),(16,20120,4.47,1,4.47),(16,20146,4.47,1,4.47),(23,0,6.87,9,61.83),(23,20006,6.87,4,27.48),(23,20109,6.87,3,20.61),(23,20110,6.87,3,20.61),(23,20111,6.87,3,20.61),(23,20112,6.87,3,20.61),(23,20113,6.87,3,20.61),(23,20114,6.87,3,20.61),(23,20115,6.87,3,20.61),(23,20118,6.87,2,13.74),(23,20119,6.87,1,6.87),(23,20120,6.87,1,6.87),(23,20122,6.87,2,13.74),(23,20142,6.87,1,6.87),(23,20144,6.87,1,6.87),(23,20145,6.87,1,6.87),(23,20146,6.87,1,6.87),(29,20028,2.47,4,9.88),(29,20111,2.47,3,7.41),(29,20112,2.47,3,7.41),(29,20113,2.47,3,7.41),(29,20114,2.47,3,7.41),(29,20115,2.47,3,7.41),(36,20052,5.97,3,17.91),(41,20075,3.97,2,7.94),(51,20011,6.97,5,34.85),(62,20068,10.97,1,10.97),(73,20097,24.97,2,49.14),(89,20048,29.97,4,119.88),(97,20035,13.47,1,13.47);
/*!40000 ALTER TABLE `items_sold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timesheet`
--

DROP TABLE IF EXISTS `timesheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timesheet` (
  `Employee_no` int(11) NOT NULL,
  `Date` varchar(45) NOT NULL,
  `Cin` varchar(45) DEFAULT NULL,
  `Cout` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Employee_no`,`Date`),
  CONSTRAINT `EmployeeNum` FOREIGN KEY (`Employee_no`) REFERENCES `employee` (`Employee_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheet`
--

LOCK TABLES `timesheet` WRITE;
/*!40000 ALTER TABLE `timesheet` DISABLE KEYS */;
INSERT INTO `timesheet` VALUES (1000,'11-24-2019','19:16:03','19:18:35'),(1000,'11-25-2019','09:22:07','09:24:10'),(1000,'11-28-2019','15:47:27','15:47:28');
/*!40000 ALTER TABLE `timesheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `Employee_no` int(11) NOT NULL,
  `transaction_num` int(10) NOT NULL AUTO_INCREMENT,
  `Total_amount_sold` decimal(30,2) DEFAULT NULL,
  `Total_qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`Employee_no`,`transaction_num`),
  KEY `transactionNum_idx` (`transaction_num`),
  CONSTRAINT `Employee_no` FOREIGN KEY (`Employee_no`) REFERENCES `employee` (`Employee_no`)
) ENGINE=InnoDB AUTO_INCREMENT=20147 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1000,20097,76.00,3),(1000,20098,25.08,4),(1000,20099,270.93,59),(1000,20100,270.93,59),(1000,20101,270.93,59),(1000,20102,270.93,59),(1000,20103,270.93,59),(1000,20104,270.93,59),(1000,20105,270.93,59),(1000,20106,270.93,59),(1000,20107,270.93,59),(1000,20108,270.93,59),(1000,20109,270.93,59),(1000,20110,270.93,59),(1000,20111,278.34,62),(1000,20112,278.34,62),(1000,20113,278.34,62),(1000,20114,278.34,62),(1000,20115,278.34,62),(1000,20116,13.41,3),(1000,20117,8.94,2),(1000,20118,18.21,3),(1000,20119,15.81,3),(1000,20120,11.34,2),(1000,20121,0.00,0),(1000,20122,13.74,2),(1000,20123,0.00,0),(1000,20124,0.00,0),(1000,20125,0.00,0),(1000,20126,0.00,0),(1000,20127,0.00,0),(1000,20128,0.00,0),(1000,20129,0.00,0),(1000,20130,0.00,0),(1000,20131,0.00,0),(1000,20132,0.00,0),(1000,20133,0.00,0),(1000,20134,0.00,0),(1000,20135,0.00,0),(1000,20136,0.00,0),(1000,20137,0.00,0),(1000,20138,0.00,0),(1000,20139,0.00,0),(1000,20140,0.00,0),(1000,20141,0.00,0),(1000,20142,6.87,1),(1000,20143,0.00,0),(1000,20144,6.87,1),(1000,20145,6.87,1),(1000,20146,11.34,2),(1010,20051,47.26,9),(1015,20004,24.36,4),(1015,20068,62.43,12),(1020,20047,10.87,2),(1025,20010,89.12,15),(1025,20073,5.05,1),(1035,20029,14.21,2),(1035,20096,71.80,13),(1040,20035,38.24,5),(1040,20085,53.72,10);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 19:18:02
