# I DID IT
def helper(arr_n, index_swap_found):   
    # take a slice of next digits:
    slice = sorted(arr_n[0: index_swap_found])
    
    # sort those last digits to get next greates digit for each
    slice.sort()
    
    print("slice post-sort:", slice)

    # stitch those array back together
    result = slice + arr_n[index_swap_found : len(arr_n)]

    # join back the array and reverse it back
    result = "".join(result)[::-1]
    
    print("Result:", result)
    
    # detect is it starts with a 0
    if result[0] == "0":
        return -1
    
    return int(result)    


def next_smaller(n):
    # parameters: n (int)
    # returns: next smallest positive int w/ same digits, return -1 if it starts w/ 0

    # turn n into reversed string then array to get indeces
    arr_n = list(reversed(str(n)))
    
    # edge case, length of 1 or less return none
    if len(arr_n) <= 1:
        return -1
    
    # iterate through every combo starting from end
    # reverse the string, go form front to back
    # for each of first_index as i starting at 1 to length max
    found_swap = False
    for i in range(1, len(arr_n)):
        # for each index from 0 to first_index - 1
        for j in range(0, i):
            # compare items at those indeces
            # if item at first_index > item at later_index
            print("indeces:", i, ",", j, "-->", arr_n[i], ">?", arr_n[j])
            if arr_n[i] > arr_n[j]:
                                                
                # print("SWAP FOUND AT:", arr_n[i], ">", arr_n[j])
                # swap and return
                temp = arr_n[j]
                arr_n[j] = arr_n[i]
                arr_n[i] = temp
                
                # print("ARRAY AFTER SWAP:", arr_n)                
                
                # set bool to allow rest to run
                return helper(arr_n, i)
    return -1
    