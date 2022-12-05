function order(words){
  if (words === "") {
    return "";
  }
  
  let arr = words.split(" ");
  let dict = {};
  
  /*
  Idea 1: Make a dict and pass through the arr once and add a number to each, then sort by those numbers. ~O(2N)
  */
  // for each word in array
  arr.forEach((word) => {
    // convert each str to arr, iterate through all letters
    [...word].forEach((letter) => {
      // when number found, store pair of (word, number as int) to array
      if (!isNaN(parseInt(letter))) {
        dict[word] = parseInt(letter);
      }
    })
  });
  
  // sort dictionary by number
  
  //Idea 2: Make a result array w/ equal length, and put the items in based on the number found
  let result = [...Array(arr.length)];

  Object.keys(dict).forEach((key) => {
    console.log(key + " " + dict[key]);
    result[dict[key]] = key;
  });
  
  // join to string, with the first space removed.
  return result.join(" ").replace(" ", "", 1);
}