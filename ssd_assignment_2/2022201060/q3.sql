USE employee;

SELECT
    Region AS "EmployeeRegion",
    SUM(
        CASE
            WHEN STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') >= CAST('00:00:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') <= CAST('08:00:00' AS TIME) THEN 1
            ELSE 0
        END
    ) AS "No. Of Employee born between 00:00 hours to 08:00 hours",
    SUM(
        CASE
            WHEN STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') >= CAST('08:01:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') <= CAST('15:00:00' AS TIME) THEN 1
            ELSE 0
        END
    ) AS "No. Of Employee born between 08.01 hours to 15.00 hours",
    SUM(
        CASE
            WHEN STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') >= CAST('15:01:00' AS TIME)
            AND STR_TO_DATE(Time_of_Birth, '%h:%i:%s %p') <= CAST('22:59:00' AS TIME) THEN 1
            ELSE 0
        END
    ) AS "No. Of Employees born after 15:01 hours until 22:59 hours"
FROM
    person
GROUP BY
    Region;