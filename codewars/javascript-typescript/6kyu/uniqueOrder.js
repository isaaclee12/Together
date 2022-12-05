var uniqueInOrder=function(iterable){
  // param: string OR array, returns: array with no same sequential items
  // store last item
  stored = "";
  
  // result
  result = [];

  // for each item in iterable
  for (let i=0; i<iterable.length; i++){
    let item = iterable[i];
    
    // if this is the first item, store it
    if (i === 0) {
      result.push(item);
      stored = item;
    }
    // else, if this item is NOT the same as "last item", store it
    if (item !== stored) {
      result.push(item);
      stored = item; // set new "last item"
    }
  }
  
  return result;
}