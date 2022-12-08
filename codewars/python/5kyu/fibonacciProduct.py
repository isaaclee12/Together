def productFib(target):
    # find 2 contiguous fibonacci numbers whose product = paramter target
    # return them with True or False depending on if the product is found

    # establish variables for fibonacci sequence
    fib1 = 0
    fib2 = 1
    
    # have a loop where we generate sequential fibonacci numbers
    while fib1 * fib2 <= target:        
        # find the product of each contiguous number pair
        # if we ever hit the target, return the two numbers + True
        if fib1 * fib2 == target:
            return [fib1, fib2, True]
        
        # iterate the fibonacci sequence
        temp = fib2 # store fib2's original value
        fib2 += fib1 # add fib1 to fib2's total
        fib1 = temp # set fib1 to fib2's old value
        
    # if we exceed the target, return the two numbers + False
    return [fib1, fib2, False]

# OPTIMAL SOLUTION:
def productFib(prod):
  a, b = 0, 1 # set values to this pair
  while prod > a * b:
    a, b = b, a + b # this skips the need for a temp var
  return [a, b, prod == a * b] # this has an auto boolean