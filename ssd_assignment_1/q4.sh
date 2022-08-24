#!/bin/bash

# Author: Bhanuj
# Description: Script to print the palindromic date of the year if present

read -p "Please enter a year? " year

# Function to check if the year is a leap year
function checkleap() {
  if [[ $(($year % 4)) -eq 0 && $(($year % 100)) -ne 0 ]]; then
    echo 1
  elif [[ $(($year % 400)) -eq 0 ]]; then
    echo 1
  else
    echo 0
  fi
}

# Appending 0 if number of digits are less than 4
while [[ ${#year} < 4 ]]; do
  year="0${year}"
done

# Append the reverse
temp=$(echo $year | rev)
palin="${temp}${year}"
d=${palin:0:2}
m=${palin:2:2}

# Check month
if [[ $((10#$m)) -lt 1 || $((10#$m)) -gt 12 ]]; then
  echo "No Palindrome days available in the given year"
  exit 0
fi

# Check date
if [[ $d -lt 1 || $d -gt 31 ]]; then
  echo "No Palindrome days available in the given year"
  exit 0
fi

# If month is Feb
# Check if leap year has 29 or not.
if [[ $((10#$m)) -eq 2 ]]; then
  if [[ checkleap -ne 0 ]]; then
    if [[ $d -gt 28 ]]; then
      echo "No Palindrome days available in the given year"
      exit 0
    fi
  else
    if [[ $d -gt 29 ]]; then
      echo "No Palindrome days available in the given year"
      exit 0
    fi
  fi
fi

# If the month is April, June, September, November check if there are less than 30 days
if [[ $((10#$m)) -eq 4 || $((10#$m)) -eq 6 || $((10#$m)) -eq 9 || $((10#$m)) -eq 11 ]]; then
  if [[ $d -gt 30 ]]; then
    echo "No Palindrome days available in the given year"
    exit 0
  fi
fi

echo -e "\033[1m${d}-${m}-${year}\033[1"

exit 0
