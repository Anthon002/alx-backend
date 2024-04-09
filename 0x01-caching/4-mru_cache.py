#!/usr/bin/env python3
"""Most Recently used mechanism for caching
"""
from base_caching import BaseCaching
from collections import OrderedDict as Ord



class MRUCache(BaseCaching):
    """Most Recently used mechanism for caching
    """
    def __init__(self):
        """Initializes the cache.
        """
        super().__init__()
        self.cache_data = Ord()

    def put(self, key, item):
        """puts an item into the cache
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                most_recently_used, _ = self.cache_data.popitem(False)
                print("DISCARD:", most_recently_used)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key, last=False)
        else:
            self.cache_data[key] = item

    def get(self, key):
        """gets items from the cache using the key
        """
        if key is not None and key in self.cache_data:
            self.cache_data.move_to_end(key, last=False)
        return self.cache_data.get(key, None)
