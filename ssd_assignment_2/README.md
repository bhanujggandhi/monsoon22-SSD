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

1. Create a databse named `employee`.
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
3. Run the SQL script `q1a.sql`, `q1b.sql`, `q1c.sql`.
