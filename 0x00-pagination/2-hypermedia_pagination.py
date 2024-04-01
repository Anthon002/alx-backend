#!/usr/bin/env python3
"""Hypermedia pagination sample.
"""
import csv
import math
from typing import Dict, List


def index_range(page, page_size):
    ''' function to return index range for a page
    '''
    start_index = (page - 1) * page_size
    end_index = start_index + (page_size)
    range_tuple = (start_index, end_index)
    return range_tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes a new Server instance.
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        df = self.dataset()
        start_index, end_index = index_range(page, page_size)
        if (page_size > len(df)):
            return []
        paginated_ = df[start_index:end_index]
        return paginated_

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Retrieves information about a page.
        """
        page_content = self.get_page(page, page_size)
        start_index, end_index= index_range(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        page_data = {
            'page_size': len(page_content),
            'page': page,
            'data': page_content,
            'next_page': page + 1 if end_index< len(self.__dataset) else None,
            'prev_page': page - 1 if start_index > 0 else None,
            'total_pages': total_pages,
        }
        return page_data
