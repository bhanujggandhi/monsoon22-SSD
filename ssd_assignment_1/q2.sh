#!/bin/bash

read -p "Enter a number enter a number less than 100001: " n

if [ $n -gt 100000 ]; then
  echo "Please enter a number less than 100001"
  exit 1
fi

if [ $n -eq 0 ]; then
  echo 2
  exit 0
fi

if [ $n -eq 1 ]; then
  echo 1
  exit 0
fi

last=1
secondlast=2

for ((i = 2; i <= $n; i++)); do
  temp=$last
  last=$(($last + $secondlast))
  secondlast=$temp
done

echo $last

exit 0
