#!/bin/bash

# Author: Bhanuj
# Description: Script to implement Kaprekar’s routine

read -p "Please enter a number: " num

# Global variables
kaprekarconst=6174
diff=0

# If number of ditis are greater than 4 exit with error
if [[ ${#num} > 4 ]]; then
  echo "Please enter number with less than 5 digits"
  exit 1
fi

while [[ $diff -ne $kaprekarconst ]]; do
  n=$num
  arr=()

  # Storint digits in a array
  for ((i = 0; i < 4; i++)); do
    arr+=($(($((10#$n)) % 10)))
    n=$(($((10#$n)) / 10))
  done

  # Printing the array as a string and sorting it
  sortedarr=($(printf "%s\n" "${arr[@]}" | sort -n))

  a=0
  b=0

  # Converting the array digits back to number
  for ((i = 0; i < 4; i++)); do
    a=$(($a + ((10 ** $i) * ${sortedarr[i]})))
    b=$(($b + ((10 ** $i) * ${sortedarr[3 - $i]})))
  done

  diff=$(($a - $b))

  # If difference is 0, that means number was invalid
  if [[ $diff -eq 0 ]]; then
    exit 1
  fi

  echo -e "\033[4m$diff"
  num=$diff
done

exit 0
