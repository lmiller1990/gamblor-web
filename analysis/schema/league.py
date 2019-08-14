from peewee import *

from schema.base import BaseModel

class League(BaseModel):

    id = PrimaryKeyField()
    name = TextField()

    class Meta:
        table_name = 'leagues'
