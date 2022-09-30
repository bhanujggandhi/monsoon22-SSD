USE `employee`;

DROP TABLE IF EXISTS `employee`.`hike2022`;

CREATE TABLE IF NOT EXISTS `employee`.`hike2022` (
    `HikePK` INT NOT NULL AUTO_INCREMENT,
    `EmpIDFK` INT NULL,
    `FirstName` VARCHAR(45) NULL,
    `LastName` VARCHAR(45) NULL,
    `Gender` VARCHAR(45) NULL,
    `WeightInKg` INT NULL,
    `LastHike` DECIMAL(2, 0) NULL,
    `LastSalary` INT NULL,
    `NewHike` DECIMAL(2, 0) NULL,
    `NewSalary` INT NULL,
    PRIMARY KEY (`HikePK`),
    UNIQUE INDEX `HikePK_UNIQUE` (`HikePK` ASC) VISIBLE,
    INDEX `fk1_idx` (`EmpIDFK` ASC) VISIBLE,
    CONSTRAINT `emp_hike_fk` FOREIGN KEY (`EmpIDFK`) REFERENCES `employee`.`person` (`Emp_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP procedure IF EXISTS `spCreateHike2022`;

DELIMITER $$ 

CREATE PROCEDURE `spCreateHike2022`() 

BEGIN 

DECLARE loopstop INT DEFAULT 0;
DECLARE EmpIDFK INT;
DECLARE FirstName VARCHAR(45) DEFAULT "";
DECLARE LastName VARCHAR(45) DEFAULT "";
DECLARE Gender2 VARCHAR(1) DEFAULT "";
DECLARE WeightInKg INT DEFAULT 0;
DECLARE LastHike DECIMAL(2, 0) DEFAULT 0;
DECLARE LastSalary INT DEFAULT 0;
DECLARE NewHike DECIMAL(2, 0) DEFAULT 0;
DECLARE NewSalary INT DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT
    Emp_ID,
    First_Name,
    Last_Name,
    Gender,
    Weight_in_Kgs,
    Last_Hike,
    Salary
FROM
    person
WHERE
    Weight_in_Kgs < 50;

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET
    loopstop = 1;

OPEN cur;

TRUNCATE TABLE `employee`.`hike2022`;

insertloop: LOOP FETCH cur INTO EmpIDFK,
FirstName,
LastName,
Gender2,
WeightInKg,
LastHike,
LastSalary;

IF loopstop = 1 THEN LEAVE insertloop;

END IF;

INSERT INTO
    hike2022(
        EmpIDFK,
        FirstName,
        LastName,
        Gender,
        WeightInKg,
        LastHike,
        LastSalary,
        NewHike,
        NewSalary
    )
VALUES
    (
        EmpIDFK,
        FirstName,
        LastName,
        Gender2,
        WeightInKg,
        LastHike,
        LastSalary,
        LastHike + 2,
        LastSalary + ((LastHike + 2) / 100) * LastSalary
    );

END LOOP insertloop;

CLOSE cur;

END $$

DELIMITER ;

CALL spCreateHike2022();

SELECT
    *
FROM
    hike2022;