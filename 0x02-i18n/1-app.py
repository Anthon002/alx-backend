#!/usr/bin/env python3
""" module for task 1
"""
from flask import Flask, render_template
from flask_bable import Babel


class Config:
    """Class for Bable configuration
    """
    LANGUAGES = ["en","fr"]
    BABEL_DEFAULT_TIMEZONE = "UTC"
    BABEL_DEFAULT_LOCALE = "en"


app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def get_index():
    """ method for index page
    """
    return render_template('1-index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
