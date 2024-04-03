#usr/bin/env python3
from base_caching import BaseCaching
"""Task Basic dictionary
"""


class BasicCache(BaseCaching):
    """ class to put and retrieve info from a dictionary
    """
    def put(self, key, item):
        """method to save into item
        """
        if(key is None or item is None):
            return 
        self.cache_data[key] = item

    def get(self, key):
        if (key is None):
            return 
        _item = self.cache_data.get(key, None)
        return _item
