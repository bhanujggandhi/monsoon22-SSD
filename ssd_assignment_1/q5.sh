#!/bin/bash

# Author: Bhanuj
# Description: Script to calculate and print nth Lucas number

read -p "Enter a number enter a number less than 100001: " n

# If the number is greater than 100000
if [ $n -gt 100000 ]; then
  echo "Please enter a number less than 100001"
  exit 1
fi

last=1
secondlast=2
# mod=1000000007

if [ $n -eq 0 ]; then
  echo 2
  exit 0
fi

if [ $n -eq 1 ]; then
  echo 1
  exit 0
fi

for ((i = 2; i <= $n; i++)); do
  temp=$last
  last=$(bc <<<"$last + $secondlast")
  secondlast=$temp
done

echo $last

exit 0
