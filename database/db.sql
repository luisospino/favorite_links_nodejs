-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema links_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema links_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `links_database` DEFAULT CHARACTER SET utf8 ;
USE `links_database` ;

-- -----------------------------------------------------
-- Table `links_database`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `links_database`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `links_database`.`links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `links_database`.`links` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `url` VARCHAR(150) NOT NULL,
  `description` VARCHAR(250) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_links_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_links_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `links_database`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;