from datetime import datetime
from peewee import *

from schema.base import BaseModel

class Game(BaseModel):
    from schema.teams import Team
    from schema.split import Split
    from schema.league import League

    id = PrimaryKeyField()
    red_side_team_id = ForeignKeyField(Team)
    red_side_team = ForeignKeyField(Team, column_name='red_side_team_id')
    blue_side_team = ForeignKeyField(Team, column_name='blue_side_team_id')
    blue_side_team_id = ForeignKeyField(Team)
    date = DateTimeField()
    split = ForeignKeyField(Split)
    league = ForeignKeyField(League)

    class Meta:
        table_name = 'games'

    @classmethod
    def find_game_with_teams(cls, t1, t2, earliest=True):
        from schema.teams import Team
        ids = [t1.id, t2.id]

        games = (cls
                .select()
                .where(
                    (cls.red_side_team_id == ids[0])
                # & (cls.blue_side_team.id.in_(ids))
                # & (cls.date > datetime(2019, 6, 1))
                # & (cls.date < datetime(2019, 8, 8))
                    )
                )

        if len(games) == 0:
            raise 'Game for ' + t1.name + ' and ' + t2.name + ' not found!'

        if len(games) != 2:
            raise 'Instead of 2 games ' + len(games) + ' games found!'

        return games
