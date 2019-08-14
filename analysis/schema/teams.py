from peewee import *

from schema.base import BaseModel

class Team(BaseModel):
    id = PrimaryKeyField()
    name = TextField()
    short_name = TextField()

    class Meta:
        table_name = 'teams'
