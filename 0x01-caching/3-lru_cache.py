#!/usr/bin/env python3
"""caching using Least Recently used mechanism.
"""
from base_caching import BaseCaching
from collections import OrderedDict as Ord



class LRUCache(BaseCaching):
    """ caches using Least Recently used mecanism
    """
    def __init__(self):
        """Initialization for the class.
        """
        super().__init__()
        self.cache_data = Ord()

    def put(self, key, item):
        """puts items into the cache.
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                least_used, _ = self.cache_data.popitem(True)
                print("DISCARD:", least_used)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key, last=False)
        else:
            self.cache_data[key] = item

    def get(self, key):
        """gets an item from the cache using the key
        """
        if key is not None and key in self.cache_data:
            self.cache_data.move_to_end(key, last=False)
        return self.cache_data.get(key, None)
