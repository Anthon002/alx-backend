#!/user/bin/env python3
'''Simple helper function
'''


def index_range(page, page_size):
    ''' function to return index range for a page
    '''
    start_index = (page - 1) * page_size
    end_index = start_index + (page_size )
    range_tuple = (start_index, end_index)
    return range_tuple
