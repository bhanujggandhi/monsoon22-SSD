USE `employee`;

SELECT
    *
FROM
    person;

DROP procedure IF EXISTS `spCreatePersonTransfer`;

DELIMITER $$ 

USE `employee` $$ 
CREATE PROCEDURE `spCreatePersonTransfer`()
BEGIN

DECLARE loopstop INT DEFAULT 0;
DECLARE EmpIDFK INT;
DECLARE FirstName VARCHAR(45) DEFAULT "";
DECLARE LastName VARCHAR(45) DEFAULT "";
DECLARE Gender2 VARCHAR(1) DEFAULT "";
DECLARE DateofJoining DATE;
DECLARE CurrentRegion VARCHAR(45) DEFAULT "";
DECLARE NewRegion VARCHAR(45) DEFAULT "";
DECLARE ExpYears INT DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT
    Emp_ID,
    First_Name,
    Last_Name,
    Gender,
    Date_of_Joining,
    Region,
    timestampdiff(YEAR, Date_of_Joining, current_date()) AS Experience
FROM
    person;

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET
    loopstop = 1;

OPEN cur;

DROP TABLE IF EXISTS `employee`.`persontransfer`;

CREATE TABLE IF NOT EXISTS `employee`.`persontransfer` (
    `PTPK` INT NOT NULL AUTO_INCREMENT,
    `EmpIDFK` INT NULL,
    `FirstName` VARCHAR(45) NULL,
    `LastName` VARCHAR(45) NULL,
    `Gender` VARCHAR(1) NULL,
    `DateofJoining` DATE NULL,
    `CurrentRegion` VARCHAR(45) NULL,
    `NewRegion` VARCHAR(45) NULL,
    PRIMARY KEY (`PTPK`),
    UNIQUE INDEX `PTPK_UNIQUE` (`PTPK` ASC) VISIBLE,
    INDEX `pt_person_fk_idx` (`EmpIDFK` ASC) VISIBLE,
    CONSTRAINT `pt_person_fk` FOREIGN KEY (`EmpIDFK`) REFERENCES `employee`.`person` (`Emp_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

insertloop: LOOP FETCH cur INTO EmpIDFK,
FirstName,
LastName,
Gender2,
DateofJoining,
CurrentRegion,
ExpYears;

IF loopstop = 1 THEN LEAVE insertloop;

END IF;

IF ExpYears > 10
AND Gender2 = 'F' THEN
INSERT INTO
    persontransfer(
        EmpIDFK,
        FirstName,
        LastName,
        Gender,
        DateofJoining,
        CurrentRegion,
        NewRegion
    )
VALUES
(
        EmpIDFK,
        FirstName,
        LastName,
        Gender2,
        DateofJoining,
        CurrentRegion,
        "DC"
    );

END IF;

IF ExpYears > 20
AND Gender2 = 'M' THEN
INSERT INTO
    persontransfer(
        EmpIDFK,
        FirstName,
        LastName,
        Gender,
        DateofJoining,
        CurrentRegion,
        NewRegion
    )
VALUES
(
        EmpIDFK,
        FirstName,
        LastName,
        Gender2,
        DateofJoining,
        CurrentRegion,
        "Capitol"
    );

END IF;

END LOOP insertloop;

CLOSE cur;

END $$

DELIMITER ;

CALL spCreatePersonTransfer();

SELECT
    *
FROM
    persontransfer;