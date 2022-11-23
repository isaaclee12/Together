def number(bus_stops):
    # paramters: bus_stops (array of int arrays), subarrays contain int pairs
    # int 1 in a pair = people who got on, int 2 = people who got off
    # these integers are ALWAYS >=0
    # second integer in first pair is ALWAYS 0, since bus is empty at first
    # return: int, number of people left on the bus after the last station/item in the array
    
    # start at 0 for the "count" of people in the bus
    bus_count = 0
    
    for pair in bus_stops:
        # add the first item in the subarray to the count
        bus_count += pair[0]
        
        # subtract the second item in the subarray from the count
        bus_count -= pair[1]
        
        print(bus_count) # First trial should print: 10, 8, 5
    
    return bus_count

import codewars_test as test
from solution import number

@test.describe("Fixed Tests")
def fixed_tests():
    @test.it('Basic Test Cases')
    def basic_test_cases():
        test.assert_equals(number([[10,0],[3,5],[5,8]]),5)
        test.assert_equals(number([[3,0],[9,1],[4,10],[12,2],[6,1],[7,10]]),17)
        test.assert_equals(number([[3,0],[9,1],[4,8],[12,2],[6,1],[7,8]]),21)