from peewee import *
import pandas as pd
from datetime import datetime

from schema.teams import Team
from schema.game import Game

# print(Team.select().first().name)

df = pd.read_csv("./tmp/flagged_bets.txt")

#  print(df.describe())
#  print(df.head())
#  
#  print(Game.select().first().red_side_team.name)
#  print(Game.select().first().blue_side_team.short_name)

def get_previous_n_games_for_team(team, n, game_date):
    games =  [
            g for g in (Game
                .select()
                .where(
                    (
                        (Game.blue_side_team_id == team.id) |
                        (Game.red_side_team_id == team.id)
                    ) &
                    (Game.date < game_date)
                )
                .limit(n)
                .order_by(Game.date.desc())
                )
            ]

    games.reverse()
    return games

def get_games(row):
    t1 = (Team
            .select()
            .where(fn.LOWER(Team.short_name) == row['t1'].lower())
            .first()
            )
    t2 = (Team
            .select()
            .where(fn.LOWER(Team.short_name) == row['t2'].lower())
            .first()
            )

    ids = [t1.id, t2.id]
    return (
            Game
                .select()
                .where(
                    (Game.date > datetime(2019, 6, 1)) &
                    (Game.date < datetime(2019, 8, 8)) &
                    (Game.red_side_team_id.in_(ids)) &
                    (Game.blue_side_team_id.in_(ids))
                    )
            )

processed = {}
for index, row in df.iterrows():
    if index >= 1:
         break

    games = get_games(row)
    k = row['t1'] + '|' + row['t2'] + '|' + row['market']
    if processed.get(k):
        # duplicate
        pass

    prev = get_previous_n_games_for_team(
            games.first().red_side_team, 20, games.first().date)

    for g in prev:
        print(g.date.strftime('%Y %m %d') + ' ' + g.blue_side_team.short_name + ' vs ' + g.red_side_team.short_name)

    print(len(prev))

    processed[k] = 1


