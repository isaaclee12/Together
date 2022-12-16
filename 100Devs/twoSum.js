// Given an array of numbers, return all pairs that add up to a given sum. 
// The numbers can be used more than once.

const twoSum = (array, sum) => {
    // return array of pairs (can repeat pairs, MUST be pairs)
    // Idea 1:
    let found = [];
    let pairs = [];

    // For every item, see if it pairs
    for (const num of array) {
        console.log("\n", num, "match: ", sum-num)
        const match = sum - num
        if (found.includes(match)) { // If we find a number that can be paired with "num" in "found", push that pair to result
            console.log("Found pair:", num, match);
            found = found.splice(found.indexOf(match) - 1, 1); // we can remove it from "found" since it has a pair 
            pairs.push([match, num]) // push valid pair to result array
            console.log("pair found, found now =", found);
        } else { // If no pair, add to "found"
            found.push(num);
            console.log("not found, found now =", found);
        }
    }
    
    return pairs;
} 

// console.log("Should implement equal [[2, 2], [3, 1]]:    ", twoSum([1, 2, 2, 3, 4], 4));


/// LEON'S METHOD:

// fyi, this is not like the leetcode version which asks you to return the indeces.

// Put each number into a hashmap
// For each item in hash map, if SUM - current number = an item in the number's we've found

/*
For each iteration: 
Start with 1
Sum is 4, 4 - 1 = 3, see if 3 is in the object
It's not, add 1 to object.
object = [1]

Next is 2,
4 - 2 = 2, see if 2 is in object
it's not, add 2 to object
object [1, 2]

So same as mine

*/

// BUT FOR REPEATS, we should use a SET.
// You'd wanna ask if it matters if pairs show up in a certain order, eg [1,3] vs [3,1]
    
const twoSumLeon = (array, sum) => {

    const found = new Set();
    let pairs = [];

    for (const num of array) {
        const match = sum - num;
        if (found.has(match)) {
            found.delete(match);
            pairs.push([match, num]);
        } else {
            found.add(num);
        }
    }
    return pairs;
} 

console.log("\n\nLEON'S SOLUTION: Should implement equal [[2, 2], [3, 1]]:    ", twoSumLeon([1, 2, 2, 3, 4], 4));
