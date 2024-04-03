#!/usr/bin/env python3
"""Using the LIFO mechanisme.
"""
from collections import OrderedDict as Ord

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """This uses the LIFO mechanism in caching
    """
    def __init__(self):
        """Initialization for the class.
        """
        super().__init__()
        self.cache_data = Ord()

    def put(self, key, item):
        """puts an item into the cache using key.
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                final_key, _ = self.cache_data.popitem(True)
                print("DISCARD:", final_key)
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=True)

    def get(self, key):
        """gets an item using the key.
        """
        return self.cache_data.get(key, None)
