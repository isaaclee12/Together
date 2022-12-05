function generateHashtag (str) {
  // parameters: string, returns: hashtag OR false if invalid
 
  // To start, we remove spaces from the string
  const test_empty = str.replace(/\s/g,"");
  
  // if the string is empty or only spaces, return false
  if (test_empty === "") {
    return false;
  }
  
  /* Now we go through all the first characters of each
  word in the string and capitalize them
  */
  let arr = str.split(" ");
  let result = "#"
  
  arr.forEach((word) => {
    if (word !== "") { // this if accounts for edge cases with ""
      word = word[0].toUpperCase() + word.substring(1);
      console.log(word);
      result += word;
    }
  });
  
  // if the result's length > 140, return false
  if (result.length > 140) {
    return false;
  }
  
  return result;
}