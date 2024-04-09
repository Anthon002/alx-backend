#!/usr/bin/env python3
""" module to print out Welcome to Holberton
"""
from flask import Flask, render_template


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/')
def get_index():
    """method to return Welcome to Holberton
    """
    return render_template("0-index.html")


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000)
