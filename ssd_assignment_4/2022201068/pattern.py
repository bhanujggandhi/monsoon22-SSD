"""
Statement: Write a python script to output the below figure on the command prompt. Follow the most 
creative and efficient way to do this.
Author: Bhanuj Gandhi (2022201068)
"""

from termcolor import colored

bottomline = " \______/ "
linewithsym = "+--------+"
message = "|  STOP  | "
pyramidlevel1 = " /      \ "
pyramidlevel2 = "/        \ "
pyramidlevel3 = "\        / "
topline = "  ______ "


print(colored(topline, "red", attrs=["bold"]))
print(colored(pyramidlevel1, "red", attrs=["bold"]))
print(colored(pyramidlevel2, "red", attrs=["bold"]))
print(colored(linewithsym, "cyan", attrs=["bold"]))
print(colored(topline, "green", attrs=["bold"]))
print(colored(pyramidlevel1, "green", attrs=["bold"]))
print(colored(pyramidlevel2, "green", attrs=["bold"]))
print(colored(pyramidlevel3, "green", attrs=["bold"]))
print(colored(bottomline, "green", attrs=["bold"]))
print(colored(pyramidlevel3, "red", attrs=["bold"]))
print(colored(bottomline, "red", attrs=["bold"]))
print(colored(linewithsym, "cyan", attrs=["bold"]))
print(colored(topline, "yellow", attrs=["bold"]))
print(colored(pyramidlevel1, "yellow", attrs=["bold"]))
print(colored(pyramidlevel2, "yellow", attrs=["bold"]))
print(colored(message, "green", attrs=["bold", "blink"]))
print(colored(pyramidlevel3, "yellow", attrs=["bold"]))
print(colored(bottomline, "yellow", attrs=["bold"]))
