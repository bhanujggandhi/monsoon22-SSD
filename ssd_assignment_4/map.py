"""
Statement: Person P is at location S and moves around in the 2D world based on sequence of input 
commands. You can consider S as any coordinate. Take user or file input for sequence of 
commands. For example, [(3mm, N), (4.5mm, NW), (2mm, SE)] is one such example of 
sequence of commands. It says that P moves for 3 millimeters in N direction from the current 
location. Next, P moves 4.5 mm in NW and so on. Here, N, S, W, E are North, South, West and 
East, respectively. Length can be taken in millimeters or centimeters.
Author: Bhanuj Gandhi (2022201068)
"""


# %matplotlib inline
from matplotlib import pyplot as plt
from matplotlib import style
import math
from termcolor import colored
from pyfiglet import Figlet

style.use("ggplot")

numeric = '0'

xplots = [0]
yplots = [0]

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


f = Figlet(font='banner3-D')
print(colored(f.renderText("MAP"), "yellow"))

plt.plot([0, 0], [0, 0], 'o', ls='-', ms=8, markevery=[-1], label="Start")

while True:
    print(colored("Please enter an input (eg: <dist><mm, cm, m, km> <N,S,W,E,NE,NW,SE,SE>) or 0 to stop",
          "magenta", attrs=["bold"]))
    inp = input()

    splitinp = inp.split()

    if len(splitinp) == 1:
        if splitinp[0] == '0':
            break

    length, unit = parselen(splitinp[0])

    if len(splitinp) <= 1 or len(splitinp) > 2 or unit == "" or unit not in ["mm", "cm", "m", "km"] or splitinp[1] not in ["N", "NE", "NW", "E", "W", "S", "SE", "SW"]:
        print("Please enter a valid input, eg: 1mm N")
        continue

    if unit == "cm":
        length = length * 10
    elif unit == "m":
        length = length * 1000
    elif unit == "km":
        length = length * 100000

    if splitinp[1] == "NE":
        tempx = (length * 0.7071) + xplots[-1]
        tempy = (length * 0.7071) + yplots[-1]
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "NW":
        tempx = xplots[-1] + (length * -0.7071)
        tempy = yplots[-1] + (length * 0.7071)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "SE":
        tempx = xplots[-1] + (length * 0.7071)
        tempy = yplots[-1] + (length * -0.7071)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "SW":
        tempx = xplots[-1] + (length * -0.7071)
        tempy = yplots[-1] + (length * -0.7071)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "N":
        tempx = xplots[-1] + (length * 0)
        tempy = yplots[-1] + (length * 1)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "S":
        tempx = xplots[-1] + (length * 0)
        tempy = yplots[-1] + (length * -1)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "E":
        tempx = xplots[-1] + (length * 1)
        tempy = yplots[-1] + (length * 0)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))
    elif splitinp[1] == "W":
        tempx = xplots[-1] + (length * -1)
        tempy = yplots[-1] + (length * 0)
        line = plt.plot([xplots[-1], tempx], [yplots[-1], tempy],
                        'o', ls='-', ms=8, markevery=[-1], label=inp)
        xplots.append(tempx)
        yplots.append(tempy)
        total_dist += length
        finalx = tempx
        finaly = tempy
        print("You are at: ", colored("(" + str(tempx)+", " +
              str(tempy) + ")", "red", attrs=["bold", "underline"]))

print("You have travelled a total distance of", colored(str(total_dist) + " mm", "green", attrs=[
      "bold", "underline"]))

angrad = math.atan2(finaly, finalx)

print("You are at a distance (Euclidean) of", colored(str(math.dist([0, 0], [
      finalx, finaly])) + " mm", "green", attrs=["bold", "underline"]), "from (0, 0) with an angle of", colored(str(math.degrees(angrad)) + " degrees.", "green", attrs=["bold", "underline"]))


plt.legend()
plt.show()
