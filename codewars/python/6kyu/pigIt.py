def pig_it(text):
    # Parameters: text (string)
    # Returns: pig_latin (string)
    pig_latin = ""
    
    # Pseudocode:
    # Split this string by " " into an array
    arr = text.split(" ")   
    print(arr)
    
    # For each word in the array
    for word in arr:
        
        word_to_add = ""
        
        # If word is not a symbol
        # Copy the first letter to the end of the word and add "ay"
        if word.isalpha():
            word_to_add += word[1:] + word[0] + "ay "
        # If word is a symbol, add it in solo
        else:
            print(word)
            word_to_add += word + " "
            
        # Add word to string to return
        pig_latin += word_to_add
        
    # return string
    return pig_latin[:-1]

# Optimal
def pig_it(text):
    lst = text.split()
    return ' '.join( [word[1:] + word[:1] + 'ay' if word.isalpha() else word for word in lst])