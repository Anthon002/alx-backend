#!/usr/bin/env python3
"""Using FIFO mechanism.
"""
from base_caching import BaseCaching
from collections import OrderedDict as Ord



class FIFOCache(BaseCaching):
    """An object for the saving and getting data using FIFO.
    """
    def __init__(self):
        """Initialzation for the class.
        """
        super().__init__()
        self.cache_data = Ord()

    def put(self, key, item):
        """pops item into the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            inti_key, _ = self.cache_data.popitem(False)
            print("DISCARD:", inti_key)

    def get(self, key):
        """gets an item using a key.
        """
        return self.cache_data.get(key, None)
