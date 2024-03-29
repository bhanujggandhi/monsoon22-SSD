"""
Statement: Build “Address Directory” in Python. Here, a directory consists of a list of entries. Each entry 
can store details such as First Name, Last Name, Address, City, State, Zip, Contact number, 
Email address, etc. In order to maintain an address directory, the following functionalities are 
required.
Author: Bhanuj Gandhi (2022201068)
"""

from csv import writer, reader, DictReader, DictWriter
import pandas as pd
import re
from termcolor import colored
from pyfiglet import Figlet
from rich.console import Console
from rich.table import Table

console = Console()


def to_table(pandas_dataframe, rtbl):

    rtbl.add_column("Sno.", style="blue")
    for column in pandas_dataframe.columns:
        rtbl.add_column(str(column))

    for index, value_list in enumerate(pandas_dataframe.values.tolist()):
        row = [str(index)]
        row += [str(x) for x in value_list]
        rtbl.add_row(*row)

    return rtbl


def checkemail(ema):
    print(ema)
    Pattern = re.compile("^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$")
    m = Pattern.match(ema)
    if m is None:
        return False
    else:
        return True


def checknumber(num):
    Pattern = re.compile("^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$")
    m = Pattern.match(num)
    if m is None:
        return False
    else:
        return True


def checkpostal(pin):
    regex = "^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$"
    Pattern = re.compile(regex)
    if (pin == ''):
        return False
    m = re.match(Pattern, pin)
    if m is None:
        return False
    else:
        return True


f = Figlet(font='banner3-D')
print(colored(f.renderText("ADDRESS"), "yellow"))

while True:
    print(colored("Enter the task input:", "magenta", attrs=["bold"]))
    print(colored("1. Add new entry to the Address Dictionary",
          "magenta", attrs=["bold"]))
    print(colored("2. Show all the entries in the dictionary",
          "magenta", attrs=["bold"]))
    print(colored("3. Update an entry", "magenta", attrs=["bold"]))
    print(colored("4. Remove an entry", "magenta", attrs=["bold"]))
    print(colored("5. Search in the dictionary", "magenta", attrs=["bold"]))
    print(colored("6. Quit", "magenta", attrs=["bold"]))
    task = int(input())
    if task == 1:
        List = []
        print(colored("Enter the first name: ", "blue"))
        List.append(input())
        print(colored("Enter the last name: ", "blue"))
        List.append(input())
        print(colored("Enter address: ", "blue"))
        List.append(input())
        print(colored("Enter city: ", "blue"))
        List.append(input())
        print(colored("Enter state: ", "blue"))
        List.append(input())
        print(colored("Enter zip: ", "blue"))
        postal = input()
        while checkpostal(postal) == False:
            console.print("❗ Please enter a valid Zip Code",
                          style="red", emoji=True)
            postal = input()
        List.append(postal)
        print(colored("Enter contact number: ", "blue"))
        num = input()
        while checknumber(num) == False:
            console.print("❗ Please enter a valid Phone Number",
                          style="red", emoji=True)
            num = input()
        List.append(num)
        print(colored("Enter email: ", "blue"))
        email = input()
        while checkemail(email) == False:
            console.print("❗ Please enter a valid email",
                          style="red", emoji=True)
            email = input()
        List.append(email)
        with open('data.csv', 'a') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(List)
            f_object.close()
        console.print("✅ Entry added successfully", style="green", emoji=True)

    elif task == 2:
        df = pd.read_csv('data.csv',
                         header=0,
                         names=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address'])
        # print(tabulate(df, headers="keys", tablefmt="fancy_outline"))

        table = Table(title="Address Book", show_header=True,
                      header_style="bold magenta", row_styles=["none", "dim"])
        table = to_table(df, table)
        console.print(table)

    elif task == 3:
        print("Enter the entry that you want to update: ")
        ind = int(input())
        print("Choose the column that you want to update:")
        ops = {
            1: "First Name",
            2: "Last Name",
            3: "Address",
            4: "City",
            5: "State",
            6: "Zip",
            7: "Contact Number",
            8: "Email Address"
        }

        # console.print(ops)

        for k in ops:
            console.print(k, style="blue bold", end="")
            console.print(":", end="  ")
            console.print(ops[k], style="yellow")

        loc = int(input())

        print("Enter a new value: ")
        newval = input()

        if loc == 6:
            while checkpostal(newval) == False:
                print("Please enter a valid Zip Code")
                newval = input()
        elif loc == 7:
            while checknumber(newval) == False:
                print("Please enter a valid contact number")
        elif loc == 8:
            while checkemail(newval) == False:
                print("Please enter a valid email address")
                newval = input()

        with open("data.csv", "r") as file:
            readData = [row for row in DictReader(file)]
            readData[ind][ops[loc]] = newval

        readHeader = readData[0].keys()

        with open("data.csv", "w") as file:
            writer = DictWriter(file, fieldnames=readHeader)
            writer.writeheader()
            writer.writerows(readData)
        console.print("✅ Entry updated successfully",
                      style="green", emoji=True)

    elif task == 4:
        print("Enter the entry that you want to delete: ")
        ind = int(input())

        with open("data.csv", "r") as file:
            readData = [row for row in DictReader(file)]
            readData.pop(ind)

        readHeader = readData[0].keys()

        with open("data.csv", "w") as file:
            writer = DictWriter(file, fieldnames=readHeader)
            writer.writeheader()
            writer.writerows(readData)
        console.print("✅ Entry deleted successfully",
                      style="green", emoji=True)

    elif task == 5:
        query = input('Enter query to find\n')

        df = reader(open('data.csv', "r"))

        res = []

        for row in df:
            for entry in row:
                if query in entry:
                    res.append(row)
                    break
        # print(tabulate(pd.DataFrame(res,
        #                             columns=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address']), headers="keys", tablefmt="fancy_outline"))
        table = Table(title="Search Results", show_header=True,
                      header_style="bold magenta", row_styles=["none", "dim"])
        table = to_table(pd.DataFrame(res,
                                      columns=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address']), table)
        console.print(table)

    elif task == 6:
        break
