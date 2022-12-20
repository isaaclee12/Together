export function humanReadable(seconds:number):string {
  // Parameters: non-negative int (seconds)
  // Returns: string (time)
  let time:string = "";
  
  // Possible edge cases acct'd for, no negatives or numbers > 3599999
  
  // Brainstorming:
  // Start with hours. 1 hour = 3600 seconds.
  // So our "HH" value should equal seconds/3600, and keep the remainder
  // with the remainder, we get the "MM" value by dividing 
  // the remainder by 60. the remainder of THAT calculation == "SS" or seconds
  
  // Pseudocode:
  // Convert seconds into hours, where HH = seconds/3600 - remainder
  let HH:string = Math.floor(seconds/3600).toString();

  // Remainder is as remaining seconds
  seconds = seconds%3600;
  
  // Convert seconds into minutes, where MM = seconds/60  - remainder
  let MM:string = Math.floor(seconds/60).toString();
  
  // Remainder is SS automatically
  let SS:string = (seconds%60).toString();
  
  // Account for single digit values
  if (HH.length < 2) {
    HH = "0" + HH;
  }
  if (MM.length < 2) {
    MM = "0" + MM;
  }
  if (SS.length < 2) {
    SS = "0" + SS;
  }
  
  // Concatenate and return
  return HH+":"+MM+":"+SS;
}


// Another Solution:
const format = (n: number) => String(Math.floor(n)).padStart(2, "00");

export function humanReadable2(seconds: number): string {
  const h = seconds / 3600;
  const m = seconds % 3600 / 60;
  const s = seconds % 3600 % 60;
  
  return [h, m, s].map(format).join(":");
}