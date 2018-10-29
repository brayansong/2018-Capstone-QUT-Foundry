-- MySQL Script generated by MySQL Workbench
-- Sat Oct 20 21:34:07 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET GLOBAL DEBUG = '+d, sdi_set_failure';
SET GLOBAL DEBUG = '-d, sdi_delete_failure';

-- -----------------------------------------------------
-- Schema Foundry
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `Foundry` ;

-- -----------------------------------------------------
-- Schema Foundry
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `Foundry` DEFAULT CHARACTER SET utf8 ;
USE `Foundry` ;

-- -----------------------------------------------------
-- Table `Foundry`.`Member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Member` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Member` (
  `MemberID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `dateOfBirth` DATETIME NOT NULL,
  `address` VARCHAR(45) NULL,
  `MemberType` ENUM("Normal", "QUT related", "Entreperneur", "Sponsor") NULL,
  `skill` VARCHAR(45) NULL,
  `InterestedIn` VARCHAR(45) NULL,
  `Education Level` ENUM("Certificate ", "Diploma", "Bachelor", "Master", "Doctor") NULL,
  `Email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`MemberID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Content` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Content` (
  `ContentID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `SubTitle` VARCHAR(45) NULL,
  `Content` VARCHAR(45) NULL,
  `Category` VARCHAR(45) NULL,
  `Introduction` VARCHAR(45) NULL,
  `PublisherID` INT NOT NULL,
  PRIMARY KEY (`ContentID`, `PublisherID`),
  INDEX `fk_Content_Member_idx` (`PublisherID` ASC) VISIBLE,
  CONSTRAINT `fk_Content_Member`
    FOREIGN KEY (`PublisherID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Group` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Group` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `GroupName` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  `BackgroundInfo` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Event` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Event` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `HolderID` INT NULL,
  `Fee` INT NULL,
  `Date` DATETIME NULL,
  `Group_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Group_ID`),
  INDEX `fk_Event_Group1_idx` (`Group_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Event_Group1`
    FOREIGN KEY (`Group_ID`)
    REFERENCES `Foundry`.`Group` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`EventGuest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`EventGuest` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`EventGuest` (
  `Member_MemberID` INT NOT NULL,
  `accepteDate` DATETIME NULL,
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Event_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Event_ID`),
  INDEX `fk_EventGuest_Event1_idx` (`Event_ID` ASC) VISIBLE,
  CONSTRAINT `fk_EventGuest_Member1`
    FOREIGN KEY (`Member_MemberID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EventGuest_Event1`
    FOREIGN KEY (`Event_ID`)
    REFERENCES `Foundry`.`Event` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`MembersInGroup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`MembersInGroup` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`MembersInGroup` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `GroupID` INT NULL,
  `joinDate` DATETIME NULL,
  `Member_MemberID` INT NOT NULL,
  `Group_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Group_ID`),
  INDEX `fk_MembersInGroup_Member1_idx` (`Member_MemberID` ASC) VISIBLE,
  INDEX `fk_MembersInGroup_Group1_idx` (`Group_ID` ASC) VISIBLE,
  CONSTRAINT `fk_MembersInGroup_Member1`
    FOREIGN KEY (`Member_MemberID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MembersInGroup_Group1`
    FOREIGN KEY (`Group_ID`)
    REFERENCES `Foundry`.`Group` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Hot pop`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Hot pop` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Hot pop` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `HireDate` DATETIME NULL,
  `Description` VARCHAR(45) NULL,
  `ProductType` VARCHAR(45) NULL,
  `Member_MemberID` INT NOT NULL,
  PRIMARY KEY (`ID`, `Member_MemberID`),
  INDEX `fk_Hot pop_Member1_idx` (`Member_MemberID` ASC) VISIBLE,
  CONSTRAINT `fk_Hot pop_Member1`
    FOREIGN KEY (`Member_MemberID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Chatroom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Chatroom` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Chatroom` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `ChatroomName` VARCHAR(45) NULL,
  `Description` VARCHAR(45) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Foundry`.`Chatroom Members`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Chatroom Members` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Chatroom Members` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `MemberID` INT NOT NULL,
  `Chatroom_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `MemberID`, `Chatroom_ID`),
  INDEX `fk_Chatroom Members_Member1_idx` (`MemberID` ASC) VISIBLE,
  INDEX `fk_Chatroom Members_Chatroom1_idx` (`Chatroom_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Chatroom Members_Member1`
    FOREIGN KEY (`MemberID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Chatroom Members_Chatroom1`
    FOREIGN KEY (`Chatroom_ID`)
    REFERENCES `Foundry`.`Chatroom` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Member_MemberID';


-- -----------------------------------------------------
-- Table `Foundry`.`Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foundry`.`Message` ;

CREATE TABLE IF NOT EXISTS `Foundry`.`Message` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `MemberID` INT NOT NULL,
  `Chatroom_ID` INT NOT NULL,
  PRIMARY KEY (`ID`, `MemberID`),
  INDEX `fk_Message_Member1_idx` (`MemberID` ASC) VISIBLE,
  INDEX `fk_Message_Chatroom1_idx` (`Chatroom_ID` ASC) VISIBLE,
  CONSTRAINT `fk_Message_Member1`
    FOREIGN KEY (`MemberID`)
    REFERENCES `Foundry`.`Member` (`MemberID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_Chatroom1`
    FOREIGN KEY (`Chatroom_ID`)
    REFERENCES `Foundry`.`Chatroom` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;