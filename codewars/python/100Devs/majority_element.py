# get marjoity in a number array, eg [3,2,3] returns 3, make O(N)
# no edge cases, there's always a majority item

import math

def majority_element(arr):

    # "best solution"?
    arr.sort() # sort the array
    return arr[math.floor(len(arr)/2)]

    elements = {} # make a hashmap
    count  = 0
    majElem = elements[0]

    for num in arr:
        elements[num] = elements[num] + 1 or 1 # Set element as 1 if not in yet, otherwise add 1 to curr. value
        # new, better solution:
        if elements[num] > (len(arr) / 2): # We know that if an element occurs more than half the time, it's automatically the majority element
            return elements[num]

    for i in range(0, len(elements)): #this is ok, but we can do better.
        if (elements[i] > count): # check which element has the highest number
            # count = elements[i] # get the one with the highest count // nvm we don't need this
            majElem = i # get the most freq. item

    return majElem # return whatever happened to be the most freq. item

def main():
    print(majority_element([3,2,3]) == 3)
    print(majority_element([1,1,2,1,2,2,2]) == 2)

main()