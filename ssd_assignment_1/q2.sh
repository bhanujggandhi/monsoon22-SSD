#!/bin/bash

size=$((6 + ($RANDOM % 14)))
echo "Password will be of length $size"

digits=({0..9})
lowercase=({a..z})
uppercase=({A..Z})
special=("~" "@" "%" "^" "!" "#" "%" "&" "(" ")" "_" "-" "+" "=" "," "." "<" ">" "/" "?" "'" ":" ";" "{" "}" "[" "]" "|")

# Total 90 character
allchar=(${digits[*]} ${lowercase[*]} ${uppercase[*]} ${special[*]})

password=()

while [[ $count -ne $size ]]; do
  randno=$(($RANDOM % 89))

  # Starting should be either lowercase or uppercase
  if [[ $count -eq 0 ]]; then
    startarr=(${lowercase[*]} ${uppercase[*]})
    randno=$(($RANDOM % 51))
    password+=(${startarr[$randno]})

  # Ending should not be with an uppercase
  elif [[ $count -eq $(($size - 1)) ]]; then
    endarr=(${lowercase[*]} ${digits[*]} ${special[*]})
    randno=$(($RANDOM % 63))
    while [[ "${password[0]}" == "${endarr[$randno]}" ]]; do
      randno=$(($RANDOM % 63))
    done
    password+=(${endarr[$randno]})

  # Two same lowercase should not be together
  elif [[ "${lowercase[*]}" =~ "${allchar[$randno]}" && "${password[$(($count - 1))]}" == "${allchar[$randno]}" ]]; then
    char=${password[$(($count - 1))]}
    while [[ "$char" == "${allchar[$randno]}" ]]; do
      echo $char
      echo ${allchar[$rando]}
      randno=$(($RANDOM % 89))
    done
    password+=(${allchar[randno]})

    # Lowercase should not be with a digit
  elif [[ "${lowercase[*]}" =~ "${password[$(($count - 1))]}" && "${digits[*]}" =~ "${allchar[$randno]}" ]]; then
    while [[ "${digits[*]}" =~ "${allchar[$randno]}" ]]; do
      echo ${allchar[$rando]}
      randno=$(($RANDOM % 89))
    done
    password+=(${allchar[randno]})

    # 2 symbols not together
  elif [[ "${special[*]}" =~ "${password[$(($count - 1))]}" && "${special[*]}" =~ "${allchar[$randno]}" ]]; then
    while [[ "${special[*]}" =~ "${allchar[$randno]}" ]]; do
      echo ${allchar[$rando]}
      randno=$(($RANDOM % 89))
    done
    password+=(${allchar[randno]})
  else
    password+=(${allchar[randno]})
  fi
  count=$(($count + 1))
done

echo "${password[*]}"
ans=""

for ((i = 0; i < ${#password[@]}; i++)); do
  ans+="${password[$i]}"
done

echo $ans
