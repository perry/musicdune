#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Perry'
SITENAME = u'MusicDune'

RELATIVE_URLS = False

TIMEZONE = 'Europe/London'

DEFAULT_LANG = u'en'

THEME = 'themes/musicdune'

PLUGINS = ['plugins.assets']

DEFAULT_PAGINATION = 10

ARTICLE_URL = 'posts/{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

PAGE_URL = 'pages/{slug}/'
PAGE_SAVE_AS = 'pages/{slug}/index.html'

AUTHOR_URL = 'author/{name}/'
AUTHOR_SAVE_AS = 'author/{name}/index.html'

CATEGORY_URL = 'category/{name}/'
CATEGORY_SAVE_AS = 'category/{name}/index.html'

TAG_URL = 'tag/{name}/'
TAG_SAVE_AS = 'tag/{name}/index.html'
