# Unfinished
import math

def sum_of_intervals(intervals):
    """
    
    sort them by first indexes

    1,4 -> 4 - 1 = +3 to total
    
    4 -> 3 in next, we do -4 + 3 = -1, negative = overlap, add -1 to total
    
    3,5 -> 5 - 3 = +2 to total
    
    5 -> 7 in next, we do -5 + 7 = +2, positive gap means we don't add

    7,10 -> 10 - 7 = +3 to total
    
    10 -> 15 in next, we do -10 + 15 = +5, positive gap means we don't add
    
    15,16 -> 16-15 = +1 to total
    
    3 - 1 + 2 + 3 + 1 = 8 total. this is the way.
    """
    
    # edge case: only one interval
    if len(intervals) == 1:
        return intervals[0][1] - intervals[0][0]

    total = 0
    # Sort all subarrays by first index
    intervals.sort()
    
    # for each pair:
    for index in range(0, len(intervals)):
        
        interval = intervals[index]
        
        # subtract absolute values of second item from first item -> add to total
        print(interval, "adds", (interval[1] - interval[0]))
        total += (interval[1] - interval[0])
        print("total now:", total)
        
        # find second item of current subarray - first item of next, if negative, add to total, otherwise ignore
        try:
            overlap = intervals[index + 1][0] -interval[1]
            if overlap < 0:
                print("adding overlap:", overlap)
                total += overlap
                print("total now:", total)

        except:
            print("eh")
            
        print("\n")
            
    # return the total
    return total
    
    
    """
    accounting for negatives:        
    -10000, 10, -10000 - 10 = -10010. wait
    -20, -10, -20 -(-10) = -10. <- we need to get absolute values
    """