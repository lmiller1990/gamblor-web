from peewee import *

from schema.base import BaseModel

class Team(BaseModel):
    id = PrimaryKeyField()
    name = TextField()
    short_name = TextField()

    class Meta:
        table_name = 'teams'


    def market_success_over_games(self, games, market):
        mapper = {
                'FBaron': 'first_baron_team_id',
                'FB': 'first_blood_team_id',
                'FD': 'first_dragon_team_id',
                'FT': 'first_turret_team_id'
                }

        success = 0
        for game in games:
            if getattr(game, mapper[market]) == self.id:
                success += 1

        return (success / len(games))

