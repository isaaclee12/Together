function solution(list){
  // parameter: a list of integers that (I'm assuming) is already sorted
  // returns: a string including intervals with a dash as described
  
  // Idea 1:
  let result = ""; // Have an array called "result" that we will return
  
  let last = null; 
  let range = [];

  for (item of list) {
    console.log("item:", item, "last:", last);
    
    if (item === last + 1 && last !== null) {
        console.log("\nFound match: " + item.toString() + " === " + last.toString() + " + 1");
        if (range.length < 2) {
            range = [last, item];
            console.log("Range init as:", range);
        } else {
            range.push(item);
            console.log("Range updated to:", range);
        }
      
    } else if (item !== last + 1 && last !== null) {
        console.log("\nNo Match: " + item.toString() + " !== " + last.toString() + " + 1");
        if (range.length > 2) {  // if range has more than 2 values
//             console.log("Adding range to result:" + range[0].toString() + "-" + range[range.length - 1].toString()); 
            result += range[0].toString() + "-" + range[range.length - 1].toString() + ","; // push RANGE array in range format ie "X-Y" into result string
            range = []; // reset range array
        
        } else if (range.length === 2) { // if range is EXACTLY 2 values
            console.log("Adding range OF 2 to result:" + range[0].toString() + "," + range[range.length - 1].toString()); 
            result += range[0].toString() + "," + range[1] + ","
            range = []; // reset range array
        
        } else { // if range not set
            result += last + ","; // we're not in an interval and we're not starting one, so we can push last as a solo integer to the solution
        }
    }
    
    if (item === list[list.length - 1]) // if item = last item of "list"
      if (range.length > 2) {  // if range has more than 2 values
            console.log("Adding range to result:" + range[0].toString() + "-" + range[range.length - 1].toString()); 
            result += range[0].toString() + "-" + range[range.length - 1].toString(); // push RANGE array in range format ie "X-Y" into result string
        
        } else if (range.length === 2) { // if range is EXACTLY 2 values
            console.log("Adding range OF 2 to result:" + range[0].toString() + "," + range[range.length - 1].toString()); 
            result += range[0].toString() + "," + range[1] 
        
        } else { // else, push item to result
          result += item; // we're not in an interval and we're not starting one, so we can push last as a solo integer to the solution
      }
    
    last = item;    
  }      
  console.log(result);
  return result;
  
  /*
  Brainstorming
  for item of list
  first item, we store, eg: last = -6

  iterate to next item: is it sequential? eg: does -3 = -6 + 1 --> in code, item = last + 1?
  No, so we move on.
  Now, last = -3
  
  iterate to next item: is it sequential? -2 = -3 + 1, so YES
    IF YES: 
      No range set right now, so make a range
        Set the "last" as the first value, and "item" as the second value
        ie range = [-3,-2] = [last, item]
  DO NOT push item to solution
  Now, last = -2
  
  iterate to next item: -1 = -2 + 1, so YES
    Range is set right now, so insert into range:
      range = [range[0], item]
  DO NOT push item to solution
  Now last = -1
  
  same thing for item = 0 and item = 1
  
  iterate to next item: 3 = 1 + 1 NO
    Range is set, but we got a NO so we push the range to the solution
  push item to solution
  Now last = 3
  */
}

// Another solution, using the "reduce" method:
solution = (list)=>list.reduce((acc,curr,i) => {
    // what.
    if (i==0) return curr.toString();
    if (list[i-1] == curr-1 && list[i+1] == curr+1) return acc;
    if (list[i-2] == curr-2 && list[i-1] == curr-1) return acc+"-"+curr;
    return acc+","+curr;
});