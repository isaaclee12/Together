def duplicate_count(text):
    # Parameters:
    # A string containing numbers and both lower and upper case letters
    
    # Returns:
    # integer equal to the count of duplicate characters, ignoring case
    
    # Pseduocode:

    # establish result var, which will count unique characters that repeat
    count_repeats = 0
    
    # establish string containing characters we've already found but have not found repeats for
    characters_counted_once = ""
    
    # establish string containing characters we've already found repeats for
    characters_counted_more_than_once = ""
    
    # iterate over every character in the string "text" by index
    for i in range(len(text)):
        
        char = text[i].lower()
        
        # if current character text[i] is in the string of characters already found
        if char in characters_counted_once and char not in characters_counted_more_than_once:
        
            # add 1 to count of repeats
            count_repeats += 1
            
            characters_counted_more_than_once += char
                                    
        # else, if we haven't found it yet, add it to the "already_found" string
        else:
            characters_counted_once += char
            
    return count_repeats


# Optimal solution from codewars:
def duplicate_count(s):
  return len([c for c in set(s.lower()) if s.lower().count(c)>1])