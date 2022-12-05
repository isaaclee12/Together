//return the total number of smiling faces in the array
export function countSmileys(arr: string[]) :number {
  // parameters: array of strings; returns: int
  
  /*
  Abstract: go through each smile
  if eyes first, 0 to 1 noses in between, then smile last, and nothing else,
  add to count of 
  */
  console.log(arr);

  // set up count of valid smiles, to be returned
  let validSmilesCount: number = 0;
  
  // set up lists of vaild eyes/noses/mouths
  const eyes: string[] = [":", ";"]
  const mouths: string[] = [")", "D"]
  const noses: string[] = ["-", "~"]
  
  // iterate through the array
  arr.forEach((smile: string) => {
    // if first is either : or ;, we're still good
    // if the last is ) or D, we're good
    if (eyes.includes(smile[0]) && mouths.includes(smile[smile.length-1])) {
      // if length is 3 chars, there must be a nose.
      // note: any more than 3 and it's invalid
      // if the middle char is -, ~, or nothing, we're still good
      if (smile.length === 3 && noses.includes(smile[1])) {
        validSmilesCount++;
      // otherwise, we've already met all the conditions, so we can add to the count
      } else if (smile.length === 2) {
        validSmilesCount++;        
      }
    } 
  })
  
  return validSmilesCount;
}