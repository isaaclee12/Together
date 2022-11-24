def binary_array_to_number(arr):
    my_string = ''.join(str(x) for x in arr)
    return int(my_string,2)