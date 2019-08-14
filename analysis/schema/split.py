from peewee import *

from schema.base import BaseModel

class Split(BaseModel):

    from schema.league import League

    id = PrimaryKeyField()
    name = TextField()
    league = ForeignKeyField(League)

    class Meta:
        table_name = 'splits'
