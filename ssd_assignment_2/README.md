# Assignment 2: SQL

**Name:** Bhanuj
**Roll no.:** 2022201068

---

## Question 1:

**Description:** Create a stored procedure that should delete the data from existing `hike2022` table and should repopulate the `hike2022` table.

**Assumption:**

1. There would be no existing `hike2022` table or if it exists we are allowed to drop it in order to maintain the structure of the table.
2. Tuples are stored in the stored procedure itself.
3. SQL script will recreate the stored procedure again and drops the older one.

**Steps to Execute:**

1. Create a database named `employee`.
2. Populate the `empdetails.csv` in a table named `person` using the provided schema.
   ```sql
   Columns:
   Emp_ID	int PK
   Name_Prefix	varchar(5)
   First_Name	varchar(11)
   Middle_Initial	varchar(1)
   Last_Name	varchar(11)
   Gender	varchar(1)
   E_Mail	varchar(33)
   Father_s_Name	varchar(20)
   Mother_s_Name	varchar(20)
   Mother_s_Maiden_Name	varchar(11)
   Date_of_Birth	date
   Time_of_Birth	varchar(11)
   Weight_in_Kgs	int
   Date_of_Joining	date
   Salary	int
   Last_Hike	decimal(2,0)
   Place_Name	varchar(22)
   County	varchar(22)
   City	varchar(22)
   State	varchar(2)
   Region	varchar(9)
   ```
3. Run the SQL scripts `q1a.sql`, `q1b.sql`, `q1c.sql`.

---

## Question 2

**Description:** Using the data from the database, write a user-defined function called “timezoneconvert” which takes three arguments - sourcedatetimestamp, sourcetimezonecode and targettimezone. It should return the targetdatetimestamp. Ignore DaylightSaving timezones here.

**My Interpretition:** In the `time_zone` table we are give multiple epoch timestamps for each country. For each epoch, there are various GMT Offsets mapped. My approach is to find the nearest epoch timestamp to the given source TimeZone and DateTime input string and grab its offset and get the GMT time. Now, we will find the nearest epoch to the source time zone and the input DATETIME string, we will get a GMT Offset using mapped to the found entry. We will add the GMT Offset to the GMT time that we got from the above query. This way we are converting the given timestamp from source time zone to destination timezone.

> **Approach**
>
> 1. Convert the input DATETIME String to epoch time stamp (`source_epoch`).
> 2. Query the `time_zone` table based on the condtion that epoch should be less `source_epoch` and time zone should be equal to input `source_time_zone`.
> 3. Sort the output of the above query in descending order of the epoch (Maximum of all the epochs that are less than `source_epoch`) and store the GMT offset of the first tuple into a variable (`source_gmt`).
> 4. Repeat the same step for `destination_time_zone` and store the GMT offset of the first tuple into another variable (`destination_gmt`).
> 5. Subtract the `source_gmt` to get the GMT Time and add the `destination_gmt` to GMT time to get the desired converted time.

**Assumptions**

1. The current offset for any time zone would be the one which is nearest to the input epoch timestamp.
2. Many countries share same time zone which may have different epochs, but we are not taking country as a argument of the function so we are just considering the nearest epoch which may be of any of the country of that time_zone.
3. If invalid DATETIME string or time zone is input, NULL will be thrown out of the function.

**Steps to Execute:**

1. Create a Database named `assignmen2`
2. Import the data from `time_zone.csv` using following schema
   ```sql
   CREATE TABLE time_zone(
    zonename varchar(255),
    countrycode varchar(10),
    timezonecode varchar(10),
    timestart BIGINT,
    gmtoffset int,
    dst int
   );
   ```
3. Run the SQL script `q2.sql`.

---

## Question 3

**Description:** Fetch the number of employees in each region who are born in between time 00:00 to 08:00, 08:01 to 15:00, and 15:01 to 22:59.

**Assumptions:**

1. I have used the exact time in HH:MM only, that is seconds are not considered in the `WHERE` clause. **So query would be 00:00:00 to 08:00:00 and not 08:00:59**.

**Steps to Execute:**

1. Import the person table as done in Q1.
2. Run the SQL script `q3.sql`.
