
# Assignment 3: Python

**Name:** Bhanuj
**Roll no.:** 2022201068

---

## Question 1 (<span>pattern.py</span>)

**Description:** Create a figure mentioned in the document using string variables.

**Assumptions:**
1. All the variables are stored in a string
2. Printed them using print function in python
3. Assumed that *creative way* means we cannot change the figure but the aesthetics of it line colours or boldness.

**Steps to Execute**

```sh
$ python map.py
```
---

## Question 2 (<span>address.py</span>)

**Description:** Build Address Directory in Python. Here, a directory consists of a list  of entries. Each entry can store details such as First Name, Last Name, Address, City, State, Zip, Contact number, Email address, etc. In order to maintain an address directory, the following functionalities are required.

**Assumptions:**
1. There are 6 options available for user to work on
	a. **Add new entry:** Upon pressing 1 user will be asked several questions which upon answering an entry will 						be added to the csv file in the name of data.csv. There is also a **validation check** for **Postal Code, Contact number, as well as Email**.
	b. **Show all entries:** Upon pressing 2 all the entries in the address book will be shown in the table format which is created using *rich library*
	┏━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━━━━┳
┃ Sno. ┃ First Name ┃ Last Name ┃ Address        ┃ City      ┃ State     ┃ Zip Code ┃ Contact Number ┃ Email Address           ┃
┡━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━━━━╇
	Above is the column names in the format table will be shown.
	c. It is also assumed that data.csv file will be present in the same folder as the python file. I have created a persistent system so all the data will be fetched from the data.csv file and saved to data.csv only.
	d. **Update an entry:** Upon pressing 3 user can update the entry in the address book based on the Sno. shown in the table. Note that Sno. is merely an index which can be changed as the entries will be deleted. So it is assumed that user will check the index before updating or deleting any entry.
	User need to enter the index number, after that there will be an option menu that will ask which value user wants to edit. There will also be a validation check while updating the entries like Postal Code, Contact number, email, etc.
	e. **Remove an entry:** Upon pressing 4, user will be asked the index of the entry that they want to delete. Note that index is the Sno. of the entry at that point of time. Sno. is the just an index which might change as entries will be deleted.
	f. **Search:** Upon pressing 5, user will be asked the query, I am querying the data based on all the entries present int the table. User can search based on any column of the table. For eg: if user query 123, and 123 sub string is present in phone number or postal code, the entry will be shown in the result table.
	g. **Quit:** Upon pressing 6, user can quit out of the program.
2. We assume that data.csv will be present with the above specified headers already present. If not a new file will be created that will have header row as the first row.
3. Postal code, Email, contact number are validated using regex.
4. It is assumed that user will have csv, pandas, re, termcolor, pyfiglet, rich libraries installed. If not run the below command
	```sh
	python -m pip install csv pandas re termcolor pyfiglet rich
	```

**Steps to Execute**
```sh
python address.py
```

---

## Question 3 (<span>map.py</span>)

**Description:** Create a news website that would fetch the data from external JSON file and display it in the web page.

**Assumption:**

1. 5 external JSON files have been put in the public directory, in order to serve the data for the application.
2. **/** page will show multiple tabs with each tab has number of news for specific category.
3. By clicking each news card, it will take you to **/:category/:id** of the news which is a dedicated page for a specific news.
4. Advertisements are fetched from **Unsplash Image API**, which is present at the bottom of each page. The news automatically updates using carousel.

**Steps to Execute**

```sh
$ python map.py
```
