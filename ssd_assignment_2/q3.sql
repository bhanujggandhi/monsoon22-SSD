USE employee;

SELECT
    Region,
    COUNT(Region)
FROM
    person
WHERE
    STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('00:00:00' AS TIME)
    AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('08:00:00' AS TIME)
GROUP BY
    Region;

-- -----------------------------------------------------------
SELECT
    Region,
    COUNT(Region)
FROM
    person
WHERE
    STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('08:01:00' AS TIME)
    AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('15:00:00' AS TIME)
GROUP BY
    Region;

SELECT
    Region,
    COUNT(Region)
FROM
    person
WHERE
    STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('15:01:00' AS TIME)
    AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('22:29:00' AS TIME)
GROUP BY
    Region;

SELECT
    Region AS "EmployeeRegion",
    (
        SELECT
            COUNT(Region)
        FROM
            person P2
        WHERE
            STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('00:00:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('08:00:00' AS TIME)
            AND P1.Region = P2.Region
        GROUP BY
            P2.Region
    ) AS "No. Of Employee born between 00:00 hours to 08:00 hours",
    (
        SELECT
            COUNT(Region)
        FROM
            person P3
        WHERE
            STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('08:01:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('15:00:00' AS TIME)
            AND P3.Region = P1.Region
        GROUP BY
            P3.Region
    ) AS "No. Of Employee born between 08.01 hours to 15.00 hours",
    (
        SELECT
            COUNT(Region)
        FROM
            person P4
        WHERE
            STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') > CAST('15:01:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') < CAST('22:29:00' AS TIME)
            AND P4.Region = P1.Region
        GROUP BY
            P4.Region
    ) AS "No. Of Employees born after 15:01 hours until 22:59 hours"
FROM
    person P1
GROUP BY
    P1.Region;