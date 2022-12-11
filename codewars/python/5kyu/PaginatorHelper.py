# TODO: complete this class
import math

class PaginationHelper:

    # The constructor takes in an array of items and a integer indicating
    # how many items fit within a single page
    def __init__(self, collection, items_per_page):
        self.collection = collection
        self.items_per_page = items_per_page
        # Divide # of items by items per page, and round up to nearest whole num
        self.page_count_amount = math.floor(self.item_count() / self.items_per_page)

    # returns the number of items within the entire collection
    def item_count(self):
        return len(self.collection)

    # returns the number of pages
    def page_count(self):
        return self.page_count_amount

    # returns the number of items on the current page. page_index is zero based
    # this method should return -1 for page_index values that are out of range
    def page_item_count(self, page_index):
        # Example: Say page count is 3, and item count is 11. Say we want page_count for page 3:
        # 3 - 1 = 2, 2 * 4 is 8. 11 - 8 = 3, which is less than 4, so 3 items on page.
        # For page 2: 2 - 1 = 1, 1 * 4 is 4. 11 - 4 = 9, which > 4, so 4 items on page by default
        # Let's turn these math-patterns into code:

        # logic here assumes "1" is the first page, so we'll add 1 to our current page count:
        tempPageCount = self.page_count()
        
        # First, let's see if the page is even in range, and return -1 if not
        if (page_index > tempPageCount):
            return -1

        # Now we'll see if we're on a last page with less items than items_per_page
        items_left_in_colletion = (self.item_count() - ((page_index - 1) * self.items_per_page))
        print("LEFT:", items_left_in_colletion)

        # 1 is an edge case. if item_count >= 1 * items_per_page, then return items_per_age, else return item_count
        if (page_index == 1):
            if (self.item_count() >= self.items_per_page): # see if we even have enough items in the collection to fill page 1
                return self.items_per_page # if so, return the usual items per page, since we know page 1 is full
            else: 
                return self.item_count() # else, return item count, since in this case, length of collection = the item count on page 1


        if (items_left_in_colletion >= self.items_per_page):
            return self.items_per_page
        else:
            return items_left_in_colletion

    # determines what page an item is on. Zero based indexes.
    # this method should return -1 for item_index values that are out of range
    def page_index(self, item_index):
        pass

def main():
    helper = PaginationHelper(['a','b','c','d','e','f'], 4)
    print("Should = 2", helper.page_count()) # should == 2
    print("Should = 6", helper.item_count()) # should == 6
    print("Should = 4", helper.page_item_count(0)) # should == 4
    print("Should = 2", helper.page_item_count(1))# last page - should == 2
    print("Should = -1", helper.page_item_count(2))# should == -1 since the page is invalid

    # page_index takes an item index and returns the page that it belongs on
    print("Should = 1", helper.page_index(5))# should == 1 (zero based index)
    print("Should = 0", helper.page_index(2))# should == 0
    print("Should = -1", helper.page_index(20))# should == -1
    print("Should = -1", helper.page_index(-10)) # should == -1 because negative indexes are invalid

main()