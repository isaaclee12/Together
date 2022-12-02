function solution (roman) {
  // in: string, out: int
  /* some things to account for:
  
  Symbol    Value
  I          1
  V          5
  X          10
  L          50
  C          100
  D          500
  M          1,000
  
  Patterns:
  
  If 1,10,100,1000: 1,2,3,5-1,10-1
  If 5,50,500: 5,6,7,8
  
  
  Possible Combos:*/
  
  const romanToNums = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000]
  ])
  
  let total = 0;
  
  // Have an iterator that we can add any amount, to skip indeces
  let i = 0;
  
  // Basic form: just convert the lettter:
  while (i < roman.length) {
    
    // temp ct 
    tempCt = i;
//     console.log(roman.charAt(i));
    
    // Get the char at i
    let char = roman.charAt(i);
    
    // Get the respective number
    let numeral = romanToNums.get(char);
    
    //   I -> I, II, III IV, IX 
    //   X -> X, XX, XXX, XL, XC
    //   C -> C, CC, CCC, CD, CM
    //   M -> M, MM, MMM

    // if current char maps to 1,10,100,or 1000, add to count
    if ([1,10,100,1000].includes(numeral)) {
      
      console.log("1-char detected:", char);

      // if next char is the same, add 2 * numeral
      if (roman.charAt(tempCt + 1) === char) {
          total += numeral * 2;
          // skip index by 1
          i++;
        
        // if there's the next next char is too, add one again
        if (roman.charAt(tempCt + 2) === char) {
            total += numeral;
            // skip index by 1
//             i++;
        }
        
      // else if the next char is 4*current, add that
      } else if (romanToNums.get(roman.charAt(tempCt + 1)) === numeral * 5) {
        total += numeral * 4;
        // skip index by 1
        i++;

        
      // else if the next char is 9*current, add that
      } else if (romanToNums.get(roman.charAt(tempCt + 1)) === numeral * 10) {
        total += numeral * 9;
        // skip index by 1
        i++;

      } else {
        // if solo, add solo
        total += numeral;
      }
      
    // note: might be edge case for M
    
    
    //   V -> V, VI, VII, VIII
    //   L -> L, LX, LXX, LXXX
    //   D -> D, DC, DCC, DCCC
    // if current char % 5 === 0, ie divisible by 5, which it will be by default
      
    // else, add as many sub-numerals as there are, up to three
    } else if ([5,50,500].includes(numeral)) {
      console.log("5-char detected:", char);
      total += numeral;
               
      if (romanToNums.get(roman.charAt(tempCt + 1)) === numeral/5) {
        total += numeral/5;
        // skip index by 1
        i++;

        if (romanToNums.get(roman.charAt(tempCt + 2)) === numeral/5) {
          total += numeral/5;
          // skip index by 1
          i++;

          if (romanToNums.get(roman.charAt(tempCt + 3)) === numeral/5) {
            total += numeral/5;
            // skip index by 1
            i++;
          }
        }
      }
    }
      
    // regular iterator of index
    i++;
    
    console.log(roman, "=", 
                total, "\n");
  }
    
	return total;
}