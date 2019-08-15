from datetime import datetime
from peewee import *

from schema.base import BaseModel

class Game(BaseModel):
    from schema.teams import Team
    from schema.split import Split
    from schema.league import League

    id = PrimaryKeyField()
    red_side_team = ForeignKeyField(Team, column_name='red_side_team_id')
    blue_side_team = ForeignKeyField(Team, column_name='blue_side_team_id')

    red_side_team_id = IntegerField(Team)
    blue_side_team_id = IntegerField(Team)
    first_blood_team_id = IntegerField(Team)
    first_turret_team_id = IntegerField(Team)
    first_dragon_team_id = IntegerField(Team)
    first_baron_team_id = IntegerField(Team)

    blue_side_team_fb_odds = DoubleField()
    blue_side_team_fd_odds = DoubleField()
    blue_side_team_ft_odds = DoubleField()
    blue_side_team_fbaron_odds = DoubleField()

    red_side_team_fb_odds = DoubleField()
    red_side_team_fd_odds = DoubleField()
    red_side_team_ft_odds = DoubleField()
    red_side_team_fbaron_odds = DoubleField()

    date = DateTimeField()
    split = ForeignKeyField(Split)
    league = ForeignKeyField(League)

    class Meta:
        table_name = 'games'

    @classmethod
    def previous_n_regular_season_games_for_team(cls, team, n, game_date):
        games =  [
                g for g in (cls
                    .select()
                    .where(
                        (
                            (cls.blue_side_team_id == team.id) |
                            (cls.red_side_team_id == team.id)
                        ) &
                        (
                            Game.date < game_date
                        ) &
                        (
                            (
                                (Game.date > datetime(2019, 1, 1))
                                # remove to exclude playoff games from prev. split
                                & (Game.date < datetime(2019, 3, 30))
                            ) |
                            (
                                (Game.date > datetime(2019, 6, 1)) &
                                (Game.date < datetime(2019, 8, 8))
                            )
                        )
                    )
                    .limit(n)
                    .order_by(cls.date.desc())
                    )
                ]

        games.reverse()
        return games
