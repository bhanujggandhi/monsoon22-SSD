#!/bin/bash

read -p "Please enter a number: " num

kaprekarconst=6174
diff=0

if [[ ${#num} > 4 ]]; then
  exit 1
fi

while [[ $diff -ne $kaprekarconst ]]; do
  n=$num
  arr=()

  for ((i = 0; i < 4; i++)); do
    arr+=($(($n % 10)))
    n=$(($n / 10))
  done

  sortedarr=($(printf "%s\n" "${arr[@]}" | sort -n))

  a=0
  b=0

  for ((i = 0; i < 4; i++)); do
    a=$(($a + ((10 ** $i) * ${sortedarr[i]})))
    b=$(($b + ((10 ** $i) * ${sortedarr[3 - $i]})))
  done

  diff=$(($a - $b))

  if [[ $diff -eq 0 ]]; then
    exit 1
  fi

  echo $diff
  num=$diff
done
