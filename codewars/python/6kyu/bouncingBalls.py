def bouncing_ball(h, bounce, window):
    # parameters:
    # height (float > 0)
    # bounce (1 < float < 0)
    # window (< height)
    
    # returns:
    # positive int (if 3 params are valid)
    # -1 (if at least param is not valid)
    
    # make sure three condition are met
    print(h, bounce, window)
    if (h < 0) or bounce < 0 or 1 <= bounce or (window >= h):
        return -1
    
    # if conditions are met:
    # ball will always pass by the window at least once if window < h
    # so we will initiate a "count" variable at 1
    count = 1
    
    # reduce height by bounce proportion to account for first bounce
    h *= bounce
    
    # we can iterate while the height after a bounce is above the window's height
    while h > window:

        # if the height after bounce > window, add 2 to count
        # we add 2 to account for the "falling" and "rising" of the ball per bounce
        if h > window:
            count += 2
            
        # reduce height by bounce proportion
        h *= bounce
            
    # return the count of times the ball can be seen out the window
    return count