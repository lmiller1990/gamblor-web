from peewee import *

from schema.db import get_connection


class BaseModel(Model):

    class Meta:
        database = get_connection()

