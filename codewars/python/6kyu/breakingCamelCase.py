def solution(s):
    # parameters:
    # s (string)
    
    # returns:
    # result (string)
    
    # pesudocode:
    # establish emptry result string
    result = ""

    # iterate over every character in string s, where character = s[i]
    for i in range(len(s)):
        # if the character is lowercase, append to result string
        # condition to right of "or" accounts for edge case where the first letter
        # is a capital letter, and therefore we should not append the result with " " 
        if s[i].islower() or (s[i].isupper() and i == 0):
            result += s[i]

        # else, the character is uppercase
        else:
            # if the character is not the first char, append a space AND the character to result string
            if i != 0:
                result += (" " + s[i])
    
    # return the result string
    return result