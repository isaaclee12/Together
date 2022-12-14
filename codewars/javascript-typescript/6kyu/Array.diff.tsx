export function arrayDiff(a: number[], b: number[]): number[] {
  /* Parameters: Two arrays
  a and b, which will always contain numbers
  */
  /*
  Returns: a copy of array a with all items present in both a AND b removed.
  */

  // Possible edge case: Item in array b is not present in array a, so don't even bother going through array a
  // Note: would it help to sort the arrays?
  
  // Brute Force Solution:
  // For each item in b
  // .remove/.replace all instances of that item in a
  // return a
  // Might O(N^2) because it's one operation per item in b times one operation per item in a.
  // Not great
  
  // Idea 2:
  // NOTE: array b will most likely be smaller than array a in cases where array a is REALLY BIG
  // Better to iterate through array a ONCE and iterate through B multiple times.

  console.log("\n array a:", a, "| array b:", b);
  
  // make a result array
  let result = [];

  // for item in array a
  for (const num of a) {    
    console.log("\nNumber to search for in b:", num); // debug
    // if item NOT in array b
    if (!b.includes(num)) {
      console.log("no match in array b, pushing to result");
      // push to num to result array
      result.push(num);      
      console.log("Result:", result);
    } else {
      console.log("match found in b, NOT pushing to result"); // debug
    }
    // otherwise don't push item to result array.
  }
  
  console.log("\nFinal Result:", result)
  // return result array at end
  return result;
}