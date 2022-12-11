# UNFINISHED, this does not workk
def choose_best_sum(t, k, ls):
    # parameters:
    # t = max number that the sum of k distances can be
    # k = amount of distances from ls to sum
    # ls = array of distances
    
    # let's first sort ls
    ls = sorted(ls)
    print(ls)

    # then, we take the top k items from ls and sum them
    i = len(ls) - 1
    item_1 = ls[i - 2]
    item_2 = ls[i - 1]
    item_3 = ls[i]
    
    while (i - 2) >= 0:
        
        print(item_1 + item_2 + item_3, t)
        
        sum = item_1 + item_2 + item_3
        # if sum <= t, return that "best sum"
        if sum <= t:
            return sum # no this doesn't work let's back up
        
        # otherwise, if that sum > t, we sum the next top 3 items
        
        # iterate the indeces
        i -= 1
        item_1 = ls[i - 2]
        item_2 = ls[i - 1]
        item_3 = ls[i]

    # if we end up using every item in ls, i.e. we land on ls[0] + ls[1] + ls[2] assuming ls[0] is the smallest
    return None