from csv import writer, reader, DictReader, DictWriter
import pandas as pd
from tabulate import tabulate

while True:
    print("Enter the task input:")
    print("1. Add new entry to the Address Dictionary")
    print("2. Show all the entries in the dictionary")
    print("3. Update an entry")
    print("4. Remove an entry")
    print("5. Search in the dictionary")
    print("6. Quit")
    task = int(input())
    if task == 1:
        List = []
        print("Enter the first name: ")
        List.append(input())
        print("Enter the last name: ")
        List.append(input())
        print("Enter address: ")
        List.append(input())
        print("Enter city: ")
        List.append(input())
        print("Enter state: ")
        List.append(input())
        print("Enter zip: ")
        List.append(input())
        print("Enter contact number: ")
        List.append(input())
        print("Enter email: ")
        List.append(input())
        with open('data.csv', 'a') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(List)
            f_object.close()

    elif task == 2:
        df = pd.read_csv('data.csv',
                         header=0,
                         names=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address'])
        print(tabulate(df, headers="keys", tablefmt="fancy_outline"))

    elif task == 3:
        print("Enter the entry that you want to update: ")
        ind = int(input())
        print("Choose the column that you want to update:")
        ops = {1: "First Name", 2: "Last Name", 3: "Address", 4: "City",
               5: "State", 6: "Zip", 7: "Contact Number", 8: "Email Address"}

        print(ops)

        loc = int(input())

        print("Enter a new value: ")
        newval = input()

        with open("data.csv", "r") as file:
            readData = [row for row in DictReader(file)]
            readData[ind][ops[loc]] = newval

        readHeader = readData[0].keys()

        with open("data.csv", "w") as file:
            writer = DictWriter(file, fieldnames = readHeader)
            writer.writeheader()
            writer.writerows(readData)


    elif task == 4:
        print("Enter the entry that you want to delete: ")
        ind = int(input())

        with open("data.csv", "r") as file:
            readData = [row for row in DictReader(file)]
            readData.pop(ind)

        readHeader = readData[0].keys()

        with open("data.csv", "w") as file:
            writer = DictWriter(file, fieldnames = readHeader)
            writer.writeheader()
            writer.writerows(readData)


    elif task == 5:
        query = input('Enter query to find\n')

        df = reader(open('data.csv', "r"))

        res = []

        for row in df:
            for entry in row:
                if query in entry:
                    res.append(row)
        print(tabulate(pd.DataFrame(res,
                           columns=['First Name', 'Last Name', 'Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address']),headers="keys", tablefmt="fancy_outline"))

    elif task == 6:
        break
