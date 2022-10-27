# %matplotlib inline
from matplotlib import pyplot as plt
from matplotlib import style
import math

style.use("ggplot")


numeric = '0'

xplots=[0]
yplots=[0]

total_dist = 0
finalx = 0
finaly = 0

def parselen(value):
  units = ""
  number = 0
  while value:
    try:
      number = float(value)
      break
    except ValueError:
      units = value[-1:] + units
      value = value[:-1]
  return number, units.strip()



while True:
  inp = input()

  splitinp = inp.split()

  if len(splitinp) == 1:
    if splitinp[0] == '0':
      break

  length, unit = parselen(splitinp[0])

  if len(splitinp) <= 1 or len(splitinp) > 2 or unit == "" or unit not in ["mm", "cm", "km"] or splitinp[1] not in ["N", "NE", "NW", "E", "W", "S", "SE", "SW"]:
    print("Please enter a valid input, eg: 1mm N")
    continue

  if splitinp[1] == "NE":
    tempx = (length * 0.7071) + xplots[-1]
    tempy = (length * 0.7071) + yplots[-1]
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "NW":
    tempx = xplots[-1] + (length * -0.7071)
    tempy = yplots[-1] + (length * 0.7071)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "SE":
    tempx = xplots[-1] + (length * 0.7071)
    tempy = yplots[-1] + (length * -0.7071)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "SW":
    tempx = xplots[-1] + (length * -0.7071)
    tempy = yplots[-1] + (length * -0.7071)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "N":
    tempx = xplots[-1] + (length * 0)
    tempy = yplots[-1] + (length * 1)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "S":
    tempx = xplots[-1] + (length * 0)
    tempy = yplots[-1] + (length * -1)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "E":
    tempx = xplots[-1] + (length * 1)
    tempy = yplots[-1] + (length * 0)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")
  elif splitinp[1] == "W":
    tempx = xplots[-1] + (length * -1)
    tempy = yplots[-1] + (length * 0)
    line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],'o',ls='-', ms=8,markevery=[-1], label=inp)
    xplots.append(tempx)
    yplots.append(tempy)
    total_dist += length
    finalx = tempx
    finaly = tempy
    print("You are at: ", "(", tempx, tempy, ")")

print("You have travelled a total distance of", total_dist, "mm")
print("You are at a distance (Euclidean) of", math.dist([0,0], [finalx, finaly]), "mm from (0, 0)")

plt.legend()
plt.show()
