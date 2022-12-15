// Given a magazine of words and a ransom note, 
// determine if it’s possible to “cut out” 
// and create the ransom note from the magazine words.


const ransomNote = (ransomString, magazine) => {

    // Parameters: ransomString, a string of words
    // Returns: True or False, depending on whether you can "cut out" the words from the magazine to get the string of words.

    // Split both strings into arrays
    ransom_arr = ransomString.split(" ");
    magazine_arr = magazine.split(" ");

    // See if ransomString as an array is a subset of magazine as an array, return true
    
    // Idea 1:
    // Make a hash map of counts to each unique word, e.g: { "Lorem": 1, "in": 2, ...}
    let magazineDict = {};

    for (word of magazine_arr) {
        // if the dictionary already has the word, increase the count
        if (word in magazineDict) {
            magazineDict[word] += 1;

        // if the dict doesn't have the word yet, init count to 1
        } else {
            magazineDict[word] = 1;
        }
    }

    // Do the same for ransomString
    let ransomDict = {};

    for (word of ransom_arr) {
        // if the dictionary already has the word, increase the count
        if (word in ransomDict) {
            ransomDict[word] += 1;

        // if the dict doesn't have the word yet, init count to 1
        } else {
            ransomDict[word] = 1;
        }
    }

    // console.log("\n")
    // If the count for each item in ransomString matches the counts in magazine, return true, otherwise return falses 
    for (word of ransom_arr) {
        // if the every value for the word in ransomDict = respective value in magazineDict, return true
        const debug = word + " in ransomString: " + ransomDict[word] + ", " + word + " in magazine: " +  magazineDict[word]
        // console.log(debug); 
        // so we only need to return false when we find there are MORE occurences of the word in RANSOMSTRING than in the MAGAZINE:
        // Also return false if not found in magazine
        if (ransomDict[word] > magazineDict[word] || magazineDict[word] === undefined) {
            return false;
        }
    }
    // and we can return true when we've passed all the tests
    return true;
}


// TEST BELOW
const magazine =
 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

console.log("Should return true", ransomNote("sit ad est sint", magazine));

console.log("Should return false", ransomNote("sit ad est love", magazine));

console.log("Should return true", ransomNote("sit ad est sint in in", magazine));

console.log("Should return false", ransomNote("sit ad est sint in in in in", magazine));

// console.log(ransomNote("egg",magazine));
// module.exports = ransom;