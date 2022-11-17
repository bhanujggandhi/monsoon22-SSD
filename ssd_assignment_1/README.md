Assignment 1
Name: Bhanuj
Roll No.: 2022201068

___________________________________________________________________________________________________

Question 1:
- Description: Bash script will take input a number and print all the twin primes as well as sum of the digital root of the pair product
- Assumptions: None
- Instruction to run:
    ```sh
    $   chmod 744 q1.sh
    $   ./q1.sh
    $   Enter a number: <INPUT>
    ```
___________________________________________________________________________________________________

Question 2:
- Description: Bash script to generate a random password having lowercase, uppercase, digits, as well as special characters
- Assumptions: 
    1. Password does not have repetitive lowercase alphabets like aa, bb, cc, etc. However ab, bc, etc. can be together
- Instruction to run:
    ```sh
    $   chmod 744 q2.sh
    $   ./q2.sh
    ```
___________________________________________________________________________________________________

Question 3:
- Description: Bash script that takes input a 4 or less digit number and prints kaprekar's routine
- Assumptions: 
    1. Numbers greater than 4 digits are not processed.
    2. If number lesser than 4 digits is input, leading zeroes are added and routine is calculated
- Instruction to run:
    ```sh
    $   chmod 744 q3.sh
    $   ./q3.sh
    $   Please enter a number: <INPUT>
    ```
___________________________________________________________________________________________________

Question 4:
- Description: Bash script to print the palindromic date of the input year
- Assumptions: 
    1. Output date is of DD-MM-YYYY format only. That is only four digit years.
    2. If the input year is less than 4 digits, leading zeroes are appended.
- Instruction to run:
    ```sh
    $   chmod 744 q4.sh
    $   ./q4.sh
    $   Please enter a year? <INPUT>
    ```
___________________________________________________________________________________________________

Question 5:
- Description: Bash script to print the nth lucas number. n is the prompt input
- Assumptions: 
    1. Input is a positive number.
    2. Due to integer overflow, bc command is used where \ occurs to as line break in the numbers
- Instruction to run:
    ```sh
    $   chmod 744 q5.sh
    $   ./q5.sh
    $   Enter a number enter a number less than 100001: <INPUT>
    ```
