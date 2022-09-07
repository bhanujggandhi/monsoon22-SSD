USE `employee`;

SELECT
    *
FROM
    person;

DROP procedure IF EXISTS `spPersonJoining`;

DELIMITER $$

CREATE PROCEDURE `spPersonJoining` ()
BEGIN

DECLARE loopstop INT DEFAULT 0;
DECLARE EmpIDFK INT;
DECLARE FirstName VARCHAR(45) DEFAULT "";
DECLARE LastName VARCHAR(45) DEFAULT "";
DECLARE DateofBirth DATE;
DECLARE Age INT DEFAULT 0;
DECLARE DateofJoining DATE;
DECLARE DayofJoining INT DEFAULT 0;
DECLARE MonthofJoining VARCHAR(15);
DECLARE YearofJoining INT DEFAULT 0;
DECLARE WorkExpinDays INT DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT
    Emp_ID,
    First_Name,
    Last_Name,
    Date_of_Birth,
    YEAR(current_date()) - YEAR(Date_of_Birth),
    Date_of_Joining,
    DAY(Date_of_Joining),
    MONTHNAME(Date_of_Joining),
    YEAR(Date_of_Joining),
    DATEDIFF(current_date(), Date_of_Joining)
FROM
    person;

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET
    loopstop = 1;

OPEN cur;

DROP TABLE IF EXISTS `employee`.`personjoining`;

CREATE TABLE IF NOT EXISTS `employee`.`personjoining` (
    `PJJoinPK` INT NOT NULL AUTO_INCREMENT,
    `EmpIDFK` INT NULL,
    `FirstName` VARCHAR(45) NULL,
    `LastName` VARCHAR(45) NULL,
    `DateofBirth` DATE NULL,
    `Age` INT NULL,
    `DateofJoining` DATE NULL,
    `DayofJoining` INT NULL,
    `MonthofJoining` VARCHAR(15) NULL,
    `YearofJoining` INT NULL,
    `WorkExpinDays` INT NULL,
    PRIMARY KEY (`PJJoinPK`),
    UNIQUE INDEX `PJJoinPK_UNIQUE` (`PJJoinPK` ASC) VISIBLE,
    INDEX `pj_person_fk_idx` (`EmpIDFK` ASC) VISIBLE,
    CONSTRAINT `pj_person_fk` FOREIGN KEY (`EmpIDFK`) REFERENCES `employee`.`person` (`Emp_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

insertloop: LOOP FETCH cur INTO EmpIDFK,
FirstName,
LastName,
DateofBirth,
Age,
DateofJoining,
DayofJoining,
MonthofJoining,
YearofJoining,
WorkExpinDays;

IF loopstop = 1 THEN LEAVE insertloop;

END IF;

INSERT INTO
    personjoining(
        EmpIDFK,
        FirstName,
        LastName,
        DateofBirth,
        Age,
        DateofJoining,
        DayofJoining,
        MonthofJoining,
        YearofJoining,
        WorkExpinDays
    )
VALUES
(
        EmpIDFK,
        FirstName,
        LastName,
        DateofBirth,
        Age,
        DateofJoining,
        DayofJoining,
        MonthofJoining,
        YearofJoining,
        WorkExpinDays
    );

END LOOP insertloop;

CLOSE cur;

END $$

DELIMITER ;

CALL spPersonJoining();

SELECT
    *
FROM
    personjoining;