#!/bin/bash

size=$((6 + ($RANDOM % 14)))
echo "Password will be of length $size"

digits=({0..9})
lowercase=({a..z})
uppercase=({A..Z})
special=("~" "@" "%" "^" "!" "#" "%" "&" "(" ")" "_" "-" "+" "=" "," "." "<" ">" "/" "?" "'" ":" ";" "{" "}" "[" "]" "|")

# Total 90 character
allchar=(${digits[*]} ${lowercase[*]} ${uppercase[*]} ${special[*]})

flag=1

while [[ $flag -eq 1 ]]; do
  password=()
  count=0
  while [[ $count -ne $size ]]; do
    randno=$(($RANDOM % 89))

    # Starting should be either lowercase or uppercase
    if [[ $count -eq 0 ]]; then
      startarr=(${lowercase[*]} ${uppercase[*]})
      randno=$(($RANDOM % 51))
      password+=(${startarr[$randno]})

    # Two same lowercase should not be together
    elif [[ "${password[$(($count - 1))]}" == "${allchar[$randno]}" && "${lowercase[*]}" =~ "${allchar[$randno]}" ]]; then
      char=${password[$(($count - 1))]}
      while [[ "$char" == "${allchar[$randno]}" ]]; do
        randno=$(($RANDOM % 89))
      done
      password+=(${allchar[randno]})

      # Lowercase should not be with a digit
    elif [[ "${lowercase[*]}" =~ "${password[$(($count - 1))]}" && "${digits[*]}" =~ "${allchar[$randno]}" ]]; then
      while [[ "${digits[*]}" =~ "${allchar[$randno]}" ]]; do
        randno=$(($RANDOM % 89))
      done
      password+=(${allchar[randno]})

    elif [[ "${digits[*]}" =~ "${password[$(($count - 1))]}" && "${lowercase[*]}" =~ "${allchar[$randno]}" ]]; then
      while [[ "${lowercase[*]}" =~ "${allchar[$randno]}" ]]; do
        randno=$(($RANDOM % 89))
      done
      password+=(${allchar[randno]})

      # 2 symbols not together
    elif [[ "${special[*]}" =~ "${password[$(($count - 1))]}" && "${special[*]}" =~ "${allchar[$randno]}" ]]; then
      while [[ "${special[*]}" =~ "${allchar[$randno]}" ]]; do
        randno=$(($RANDOM % 89))
      done
      password+=(${allchar[randno]})
    else
      password+=(${allchar[randno]})
    fi
    count=$(($count + 1))
  done

  lowercount=0
  uppercount=0
  specialcount=0
  digitcount=0

  for ((i = 0; i < $size; i++)); do
    if [[ "${special[@]}" =~ "${password[$i]}" ]]; then
      specialcount=$(($specialcount + 1))
    elif [[ "${lowercase[@]}" =~ "${password[$i]}" ]]; then
      lowercount=$(($lowercount + 1))
    elif [[ "${uppercase[@]}" =~ "${password[$i]}" ]]; then
      uppercount=$(($uppercount + 1))
    elif [[ "${digits[@]}" =~ "${password[$i]}" ]]; then
      digitcount=$(($digitcount + 1))
    fi
  done

  if [[ $lowercount -eq 0 || $uppercount -eq 0 || $specialcount -eq 0 || $digitcount -eq 0 || "${uppercase[@]}" =~ "${password[$(($size - 1))]}" ]]; then
    flag=1
    continue
  else
    flag=0
    break
  fi
done

echo "${password[*]}"
ans=""

for ((i = 0; i < ${#password[@]}; i++)); do
  ans+="${password[$i]}"
done

echo $ans
