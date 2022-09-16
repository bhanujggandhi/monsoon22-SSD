USE `assignmen2`;

DROP function IF EXISTS `timezoneconvert`;

SET
    GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$ 

USE `assignmen2` $$

CREATE FUNCTION `timezoneconvert` (
    inputdate VARCHAR(255),
    sourcetz VARCHAR(10),
    targettz VARCHAR(10)
) RETURNS DATETIME BEGIN DECLARE Ans DATETIME;

DECLARE SourceHours decimal(10, 4);

DECLARE DestinationHours decimal(10, 4);

SELECT
    gmtoffset / 3600 INTO SourceHours
FROM
    time_zone
WHERE
    timestart < TIMESTAMPDIFF(
        SECOND,
        FROM_UNIXTIME(0),
        STR_TO_DATE(inputdate, '%d-%m-%Y %h:%i:%s')
    )
    AND timezonecode = sourcetz
ORDER BY
    timestart DESC
LIMIT
    1;

SELECT
    gmtoffset / 3600 INTO DestinationHours
FROM
    time_zone
WHERE
    timestart < TIMESTAMPDIFF(
        SECOND,
        FROM_UNIXTIME(0),
        STR_TO_DATE(inputdate, '%d-%m-%Y %h:%i:%s')
    )
    AND timezonecode = targettz
ORDER BY
    timestart DESC
LIMIT
    1;

-- SELECT SourceHours;
-- SELECT DestinationHours;
-- SELECT DestinationHours - SourceHours;
SELECT
    DATE_ADD(
        STR_TO_DATE(inputdate, '%d-%m-%Y %h:%i:%s'),
        INTERVAL DestinationHours - SourceHours HOUR
    ) INTO Ans;

RETURN Ans;

END $$ 

DELIMITER;

SELECT
    timezoneconvert('29-07-2022 02:53:00', 'EDT', 'IST');