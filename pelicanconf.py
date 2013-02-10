#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Perry'
SITENAME = u'MusicDune'

RELATIVE_URLS = False

SITEURL = 'http://output.dev'
FEED_DOMAIN = SITEURL

TIMEZONE = 'Europe/London'

DEFAULT_LANG = u'en'

THEME = 'themes/musicdune'

PLUGINS = ['plugins.assets', 'pelican.plugins.sitemap']

DEFAULT_PAGINATION = 10

ARTICLE_URL = '{slug}/'
ARTICLE_SAVE_AS = '{slug}/index.html'

PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

AUTHOR_URL = 'author/{name}/'
AUTHOR_SAVE_AS = 'author/{name}/index.html'

CATEGORY_URL = '{name}/'
CATEGORY_SAVE_AS = '{name}/index.html'

TAG_URL = 'tag/{name}/'
TAG_SAVE_AS = 'tag/{name}/index.html'

SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'daily',
        'indexes': 'always',
        'pages': 'daily'
    }
}
