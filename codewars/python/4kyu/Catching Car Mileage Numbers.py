import re

def check_if_interesting(num, awesome_phrases):
    # Ok this is so much better than regex
    return num in awesome_phrases or str(num) in "1234567890 9876543210" or str(num) == str(num)[::-1] or int(str(num)[1:]) == 0    
    
def is_interesting(number, awesome_phrases):
    # parameters: number (int), awesome_phrases (array[int])
    # reutrns: 0 if not interesting, 1 if interesting in 1 or 2 miles, or 2 if interesting.
        
    print(number)
    # Pseudocode:
    # Say number is X
    # if X interesting, return 2
    if number > 99 and check_if_interesting(number, awesome_phrases):
        return 2
    
    # if X + 1 or X + 2 is interesting, return 1
    if number > 97 and (check_if_interesting(number + 1, awesome_phrases) or check_if_interesting(number + 2, awesome_phrases)):
        return 1
    
    # else return 0
    return 0
    
    # How do we check if a number is interesting?
    # It would be slow to scan through a big array of numbers every time we do this
    # Perhaps we can just send the number through a series of regex "if" statements
    # And consolidate it in a function so we don't have to copy and paste it
    
    # Let's start by trying to detect if a number is "interesting":
#     test_interesting = [10, 90000000,
#                 11, 777777777777,
#                 1234, 1234567890, 5678, 90,
#                 4321, 987654321, 7654, 9876, 21, 98,
#                 1221, 123421, 73837, 9009, 909,
#                 1337, 256]

#     test_not_interesting = [12333, 3049, 330, 190834982, 9875, 666668, 1336, 9839434]

#     print("INTERESTING TESTS:")
#     for num in test_interesting:
#         print(check_if_interesting(num, awesome_phrases))
        
#     print("\nNOT INTERESTING TESTS:")
#     for num in test_not_interesting:
#         print(check_if_interesting(num, awesome_phrases))
        
    return
    