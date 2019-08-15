from peewee import *
import pandas as pd
from datetime import datetime
from decimal import Decimal

from schema.teams import Team
from schema.game import Game


df = pd.read_csv("./tmp/flagged_bets.txt")

#  print(df.describe())
#  print(df.head())
#  
#  print(Game.select().first().red_side_team.name)
#  print(Game.select().first().blue_side_team.short_name)

def get_teams(t1_short_name, t2_short_name):
    t1 = (Team
            .select()
            .where(fn.LOWER(Team.short_name) == t1_short_name.lower())
            .first()
            )
    t2 = (Team
            .select()
            .where(fn.LOWER(Team.short_name) == t2_short_name.lower())
            .first()
            )

    return [t1, t2]

def get_games(row, t1, t2):
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
sum_evs = 0
GAMES = 18
total_bets = 0

for index, row in df.iterrows():
    [t1, t2] = get_teams(row['t1'], row['t2'])
    games = get_games(row, t1, t2)

    k = row['t1'] + '|' + row['t2'] + '|' + row['market']
    is_dup = False
    if processed.get(k):
        is_dup = True

    date = games[0].date
    if is_dup:
        date = games[1].date

    prev = Game.previous_n_regular_season_games_for_team(t1, GAMES, date)

    for g in prev:
        pass
        # print(g.date.strftime('%Y-%m-%d') + ' ' + g.blue_side_team.short_name + ' vs ' + g.red_side_team.short_name)

    market_success = t1.market_success_over_games(prev, row['market'])

    opponent_games = Game.previous_n_regular_season_games_for_team(t2, GAMES, date)
    opponent_success = t2.market_success_over_games(opponent_games, row['market'])

    ev = ((market_success + (1 - opponent_success)) / 2) * row['odds']
    sum_evs += ev
    # print("ev: ", ev, t1.short_name, '(', market_success, ')',  ' to get ' + row['market'] + ' vs ' + t2.short_name, '(', opponent_success, ')')


    processed[k] = 1
    total_bets += 1

#print(sum_evs/total_bets)
#print(df['staked'].sum(), df['rewarded'].sum())

spring_games = Game.select().where((Game.date > datetime(2019, 6, 1)) & (Game.date < datetime(2019, 8, 8)))

#print(len(spring_games))

blue_map = { 
        'FBaron': 'blue_side_team_fbaron_odds',
        'FB': 'blue_side_team_fb_odds',
        'FD': 'blue_side_team_fd_odds',
        'FT': 'blue_side_team_ft_odds'
        }

red_map = { 
        'FBaron': 'red_side_team_fbaron_odds',
        'FB': 'red_side_team_fb_odds',
        'FD': 'red_side_team_fd_odds',
        'FT': 'red_side_team_ft_odds'
        }

first_map = {    
        'FBaron': 'first_baron_team_id',
        'FB': 'first_blood_team_id',
        'FD': 'first_dragon_team_id',
        'FT': 'first_turret_team_id'
        }

MINIMUM_EV = 1.1
MIN_DIFF = 0.2

bets = []
for game in spring_games:
    blue_team = game.blue_side_team
    red_team = game.red_side_team
    blue_prev_games = Game.previous_n_regular_season_games_for_team(blue_team, GAMES, game.date)
    red_prev_games = Game.previous_n_regular_season_games_for_team(red_team, GAMES, game.date)

    for mkt in ['FB', 'FT', 'FD']: # , 'FBaron']:
        blue_market_success = blue_team.market_success_over_games(blue_prev_games, mkt)
        red_market_success = red_team.market_success_over_games(red_prev_games, mkt)

        blue_odds = getattr(game, blue_map[mkt])
        red_odds = getattr(game, red_map[mkt])

        if blue_odds is not None and red_odds is not None:
            blue_ev = float(((blue_market_success + (1 - red_market_success)) / 2)) * blue_odds
            red_ev = float(((red_market_success + (1 - blue_market_success)) / 2)) * red_odds

            if blue_ev > MINIMUM_EV and (blue_market_success - red_market_success) > MIN_DIFF:
                # print(blue_team.name, mkt, blue_market_success, blue_ev)
                bets.append({
                    'date': game.date,
                    'team': blue_team.name,
                    'opponent': red_team.name,
                    'team_id': blue_team.id,
                    'result': getattr(game, first_map[mkt]) == blue_team.id,
                    'past_games': blue_prev_games,
                    'opponent_past_games': red_prev_games,
                    'mkt': mkt,
                    'success': blue_market_success,
                    'opponent_success': red_market_success,
                    'odds': blue_odds,
                    'ev': blue_ev
                    })

            if red_ev > MINIMUM_EV and (red_market_success - blue_market_success) > MIN_DIFF:
                # print(red_team.name, mkt, red_market_success, red_ev)
                bets.append({
                    'team': red_team.name,
                    'date': game.date,
                    'opponent': blue_team.name,
                    'team_id': red_team.id,
                    'result': getattr(game, first_map[mkt]) == red_team.id,
                    'past_games': red_prev_games,
                    'opponent_past_games': blue_prev_games,
                    'mkt': mkt,
                    'success': red_market_success,
                    'opponent_success': blue_market_success,
                    'odds': red_odds,
                    'ev': red_ev
                    })

print(len(bets))

initial_bankroll = 200
bankroll = 200
STAKE = 30
wins = 0
ev = 0

i = 0
for bet in bets:
    i += 1
    bankroll -= STAKE

    ev += bet['ev']

    if bet['result'] == True:
        wins += 1
        bankroll += (STAKE * bet['odds'])

    if i == 10:
        print('(', bet['result'], ')',  bet['date'], bet['team'], bet['opponent'], bet['mkt'])
        print('====================')
        j = 1
        for game in bet['past_games']:
            print('(', getattr(game, first_map[bet['mkt']]) == bet['team_id'], ')', j, game.date, game.blue_side_team.name, game.red_side_team.name)
            j+=1

print('ending bankroll:', bankroll, 'win/loss:', wins, len(bets))
profit_percent = ((bankroll - initial_bankroll) / initial_bankroll) * 100
print('% profit:', profit_percent)
total_staked = (len(bets) * STAKE)
dollars_profit = bankroll - initial_bankroll

print('dollar profit', dollars_profit, 'staked', total_staked)
print('average expected value', ev / len(bets))
print('minimum EV', MINIMUM_EV)
print('actual value', 1 + (dollars_profit / total_staked))
