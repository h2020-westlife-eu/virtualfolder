# coding: utf-8

# Copyright Luna Technology 2015

from .base import SettingsBase


class SettingsDev(SettingsBase):
    DEBUG = True

    DB_NAME = 'postgres'
    DB_USER = 'postgres'
    DB_PASS = 'changeit'

    BASE_URL = 'http://127.0.0.1:8000'

    def JS_CONFIG(self):
        conf = super(SettingsDev, self).JS_CONFIG()
        conf['WS_SERVER'] = 'http://127.0.0.1:22000/ws'
        return conf
