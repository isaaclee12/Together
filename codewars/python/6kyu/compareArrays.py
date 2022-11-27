import math

def comp(a, b):
    # Parameters: 2 arrays of integers, unsorted
    # Return: boolean, true if elements b are squares of the elemnts a, false if otherwise
    
    # Note: a or b might be null, in such a case return false
    # if a or b null, return false
    
    if a is None or b is None:
        return False
    
    # Note: length of both arrays should be the same, otherwise this doesn't make sense
    if len(a) != len(b):
        return False

    # Note: if any number in b is not square, return false
    # for every number in array b, if any number is not a perfect square, return false
    for number in b:
        if math.isqrt(number) ** 2 != number:
            return False
        
    # Note: convert all negative numbers to positives in a
    # Note: We only have to do this for a b/c square nums are always positive
    for i in range(len(a)):
        if a[i] < 0:
            a[i] *= -1
    
    # Note: arrays might be [] or {}
	# Sort arrays a and b
    a.sort()
    b.sort()
        
    # iterate over every index in array a.
    for i in range(len(a)):
        print(a[i], b[i])

        # if the item at the same index in array b is a square of the respective item in array a, keep looping
        if a[i]**2 != b[i]:
            # if ever OTHERWISE, return false immediately
            return False
    
    # return true after every item between a and b have been checked
    return True


# Optimal solution:
def comp(array1, array2):
    try:
        return sorted([i ** 2 for i in array1]) == sorted(array2)
    except:
        return False