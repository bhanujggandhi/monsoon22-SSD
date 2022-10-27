from csv import writer
import pandas as pd


while True:
    print("Enter the task input")
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
    
    elif task == 3:
        df = pd.read_csv("data.csv")
        pd.options.display.max_rows = 9999
        print(df)
    
    elif task == 0:
        break
