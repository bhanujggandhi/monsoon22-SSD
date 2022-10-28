from csv import writer, reader
import pandas as pd


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
        df = pd.read_csv("data.csv")
        df = pd.read_csv('data.csv',
            header=0, 
            names=['First Name', 'Last Name','Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address'])
        pd.options.display.max_rows = 9999
        print(df)
    
    elif task == 5:
        query = input('Enter number to find\n')

        df = reader(open('data.csv', "r"))

        res = []

        for row in df:
            for entry in row:
                if query in entry:
                    res.append(row)

        print(pd.DataFrame(res, 
            columns=['First Name', 'Last Name','Address', 'City', 'State', 'Zip Code', 'Contact Number', 'Email Address']))
    
    elif task == 6:
        break
