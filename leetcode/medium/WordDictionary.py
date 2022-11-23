# TOO SLOW
# what is a tree
# note to future self: Nov 2022 forgot DSA!!!!

import re

class WordDictionary(object):

    def __init__(self):
        self.array = []

    def addWord(self, word):
        """
        :type word: str
        :rtype: None
        """
        self.array.append(word)

    def search(self, word):
        """
        :type word: str
        :rtype: bool
        """
        """
        ".ad" --> "ad"
        "b.d" --> "bad"
        """
        if "." in word:
            word = "^" + word + "$"
            for arrWord in self.array:
                # print(word, arrWord)
                if re.search(word, arrWord):
                    return True
            return False
        else:
            if word in self.array:
                return True
            return False


        # if word passed in contains .'s
        # remove periods from string
        # for each word in the array
        # see if string, now without periods
        


# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)

# dict = new WordDictionary()
# dict.addWord("dog")

# Added: bad, dad, mad
# Searches: pad, bad, .ad, b.., 