def expanded_form(num):
    # parameters:
    # num (int)
    
    # returns:
    # result (string)
    result = ""
    
    # pseudocode
    # string-ify num
    num = str(num)
    
    # set power of ten we're on to length of the string
    power_of_ten = len(num) - 1

    # iterate over string from 0 to length of string
    for i in range (len(num)):
        # item_to_add = 10^power_of_ten * 
        item_to_add = 10**power_of_ten * int(num[i])

        # if not all zeroes, add item_to_add to result
        if int(item_to_add) != 0:
            result += str(item_to_add)
            
            # if there are still more non-zero digits in string after current digit, 
            # or if we're not at the end, add a plus to the string
            string_left = num[i + 1:len(num)]
            if string_left != "" and int(string_left) != 0:
                result += " + "

        # reduce power of ten by 1 before moving to next digit
        power_of_ten -= 1

    return result
