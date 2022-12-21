/*
@param {array<int>} A - an array of integers to scan
@returns (int) - the smallest positive integer not in array A
*/
function solution(A) {
    // NOTE: Possible edge cases where A is: 0, -1, undefined, null, or an array of non-int values?
    // Tester throws an error if A is undefined, null, or non-integer array, so let's leave those cases to theoretically be handled outside this function

    // if A is empty, return 1
    if (A.length === 0) {
        return 1;
    }

    // Save Next Smallest Positive Number, 1 by default
    let nextSmallestPositiveInt = 1;

    // For every item in A sorted
    A.sort();

    for (num of A) {
        if (num === nextSmallestPositiveInt) {
            nextSmallestPositiveInt++;
        }
    }

    // console.log(nextSmallestPositiveInt);
    
    return nextSmallestPositiveInt;
}
    

/*
Codility demo task.

Write a function:

function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].
Copyright 2009–2022 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
*/