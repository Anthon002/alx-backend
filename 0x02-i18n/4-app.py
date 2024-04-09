#!/usr/bin/env python3
"""Module for task 4
"""
from flask_babel import Babel
from flask import Flask, render_template, request


class Config:
    """Class for configuring babbel
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """ method to get a web_page locale.
    """
    _requests = request.query_string.decode('utf-8').split('&')
    request_table = dict(map(
        lambda x: (x if '=' in x else '{}='.format(x)).split('='),
        _requests,
    ))
    if 'locale' in request_table:
        if request_table['locale'] in app.config["LANGUAGES"]:
            return request_table['locale']
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def get_index() -> str:
    """method for index page
    """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
