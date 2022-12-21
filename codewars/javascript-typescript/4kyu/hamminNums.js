  /* Brainstorming:
  Smallest numbers in order:
  1,  1 = all^0

  2,  2 = 2^1 
  3,  3 = 3^1 (1 after 2^x)
  
  4,  4 = 2^2
  5,  5 = 5^1
  6,  6 = 2^1 * 3^1 (2 after 2^x)
  
  7,  8 = 2^3
  8,  9 = 3^2
  9,  10 = 2^1 * 5^1
  10, 12 = 2^2 * 3^1
  11, 15 = 3^1 * 5^1 (4 after 2^x)
  
  12, 16 = 2^4
  13, 18 = 2^1 * 3^2
  14, 20 = 2^2 * 5^1
  15, 24 = 2^3 * 3^1
  16, 25 = 5^2
  17, 27 = 3^3
  18, 30 = 2^1 * 3^1 * 5^1 (6 after 2^x)
  
  19, 32 = 2^5
  */
  
  // Brute force method = iterate through every i,j,k, but that's too slow
  
  // In general, we want to be able to go through each hamming number in
  // the sequence and return the one at the correct index
  
  // There's a way of generating these numbers that I found
  // start with 1
  // next is 2 line = a
  // then 3 line = b
  // then 2 line ^ 2 -> 4
  // then 5 line
  // then a * b = 6 on 6-line
  // then we try to see what line is next: 2, 3, 5, or 6.
  
  // really, let's list out all the multiples of these numbers:
  
  // 2,4,6,8,10,12, NOT 14 b/c no 7, 16,18,20, NOT 22 b/c no 11, etc
  // 3,6,9,12,15,18, NOT 21 b/c no 7
  
  // basically, each number must be reducable into factors of 2 3 and 5
  // so if we go through each number and divide each by all 3 over and over again, 
  // if we can never divide the number down to "1", ie we hit "7" from 21, we don't add to the count to match n
  // in other words, keep generating these numbers until we hit n

function isHamming (num) {
  // keep dividing num by 2,3,5 or 5 until it hits 1 OR can't be divided by any
  while (num % 2 === 0 || num % 3 === 0 || num % 5 === 0) {
    if (num % 2 === 0) {
      num /= 2;
    }
    if (num % 3 === 0) {
      num /= 3;
    }
    if (num % 5 === 0) {
      num /= 5;
    }
  }

  // if it was a factor of 2, 3, or 5, return true
  if (num === 1) {
    return true;
  }

  // otherwise, that means some other factor was in there. return false
  return false;
}

function hamming (n) {
  // Parameters: int n 
  // Returns: the "n"th smallest Hamming number
  
  // console.log("\nFetching the "+n+"th hamming number:");
  
  // first case: n = 1
  if (n === 1) {
    return 1;
  }
  
  let hammingNumbersFound = 0;
  let numberToCheck = 1;

  // keep generating hamming numbers until we hit n hamming numbers found
  while (hammingNumbersFound < n) {
    
    // if haskill number, add to hammingNumbersFound
    
    if (isHamming(numberToCheck)) {
      // console.log("\n" + numberToCheck, "is a hamming number");
      hammingNumbersFound++;
      // console.log("Found", hammingNumbersFound, "hamming numbers, n =", n);
      if (hammingNumbersFound === n) {
        break;
        // console.log("The "+n+"th hamming number is: "+numberToCheck);
        return numberToCheck;
      }
    } else {
      // console.log(numberToCheck, "is NOT a hamming number");
    }
    
    // if not, keep looping
    numberToCheck++;
  }
  
  // once we've found "n" hamming numbers, return the number we last checked
  return numberToCheck;
}