// Given an array of numbers, return all pairs that add up to a given sum. 
// The numbers can be used more than once.

const twoSum = (array, sum) => {
    // return array of pairs (can repeat pairs, MUST be pairs)
    // Idea 1:
    let found = [];
    let pairs = [];

    // For every item, see if it pairs
    for (num of array) {
        console.log("\n", num, "match: ", sum-num)
        let match = sum - num
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

console.log("Should implement equal [[2, 2], [3, 1]]:", twoSum([1, 2, 2, 3, 4], 4));