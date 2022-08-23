#!/bin/bash

# Initialise an empty array
nums=()

read -p "Enter a number: " n

# Populate the array with 0
for ((i = 0; i <= $n; i++)); do
  nums+=(0)
done

# Sieve of Eratosthenes
for ((p = 2; p * p <= n; p++)); do
  if [ ${nums[$p]} -eq 0 ]; then
    for ((j = 2 * $p; j <= $n; j += $p)); do
      nums[$j]=1
    done
  fi
done

twins=()

for ((p = 2; p <= $n - 2; p++)); do
  if ((nums[$p] == 0 && nums[$p + 2] == 0)); then
    echo "($p, $(($p + 2)))"
    temp=$(($p * $(($p + 2))))
    twins+=(${temp})
  fi
done

ans=0

for i in ${twins[@]}; do
  temp=$((($i - 1) % 9 + 1))
  ans=$(($ans + $temp))
done

echo $ans

exit 0
