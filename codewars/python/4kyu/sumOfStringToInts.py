#UNFINISHED
def sum_strings(x, y):

    # let's make a "total" value to hold our result to return at the end
    total = 0

    # say x is 1234567890000000000000000000000000 which is way out of the integer range
    i = len(x)
    while i != 0:
        i -= 1
        exponenet = 10 ** (len(x) - i - 1)
        print(exponenet, x[i])
    # we can go through the string backwards, where index -1 = 1's place, -2 = 10's place.
    # Essentially, the digit-place = 10 ^ ( (reverse-index * -1) - 1)
    # We then add the digit-place plus the actual digit at that index to the total

sum_strings("1234567890000000", "12")