adc = Position.find_or_create_by(name: 'ADC')
support = Position.find_or_create_by(name: 'Support')
jungle = Position.find_or_create_by(name: 'Jungle')
top = Position.find_or_create_by(name: 'Top')
middle = Position.find_or_create_by(name: 'Middle')

c9 = Team.find_or_create_by(name: 'Cloud 9')
tsm = Team.find_or_create_by(name: 'Team Solomid')
tl = Team.find_or_create_by(name: 'Team Liquid')
clutch = Team.find_or_create_by(name: 'Clutch Gaming')
gg = Team.find_or_create_by(name: 'Golden Guardians')
echo = Team.find_or_create_by(name: 'Echo Fox')
flyquest = Team.find_or_create_by(name: 'Flyquest')
optic = Team.find_or_create_by(name: 'Optic Gaming')
clg = Team.find_or_create_by(name: 'Counter Logic Gaming')
thieves = Team.find_or_create_by(name: '100 Thieves')

def rand_min_and_sec 
  min = (rand * 100 % 20).ceil
  sec = (rand * 100 % 60).ceil
  DateTime.new(1, 1, 1, 0, min, sec)
end

def min_and_sec(min, sec)
  DateTime.new(1, 1, 1, 0, min, (((sec/100.0) * 60).ceil))
end

def create_contract(player, team)
  Contract.find_or_create_by(player: player, team: team, start: 1.year.ago)
end

# tl
doublelift = Player.find_or_create_by(name: "Doublelift", position_id: adc.id)
xmithie = Player.find_or_create_by(name: "Xmithie", position_id: jungle.id)
impact = Player.find_or_create_by(name: "Impact", position_id: top.id)

# clutch
hakuho = Player.find_or_create_by(name: 'Hakuho', position_id: support.id)
apollo = Player.find_or_create_by(name: 'Apollo', position_id: adc.id)
lira = Player.find_or_create_by(name: 'Lira', position_id: jungle.id)
create_contract(hakuho, clutch)
create_contract(lira, clutch)
create_contract(apollo, clutch)

# c9
sneaky = Player.find_or_create_by(name: "Sneaky", position_id: adc.id)
create_contract(sneaky, c9)

jensen = Player.find_or_create_by(name: "Jensen", position_id: middle.id)
create_contract(jensen, c9)

licorice = Player.find_or_create_by(name: 'Licorice', position_id: top.id)
create_contract(licorice, c9)

svenskeren = Player.find_or_create_by(name: 'Svenskeren', position_id: top.id)
create_contract(svenskeren, c9)

goldenglue = Player.find_or_create_by(name: 'Goldenglue', position_id: top.id)
create_contract(goldenglue, c9)

zeyzal = Player.find_or_create_by(name: 'Zeyzal', position_id: top.id)
create_contract(zeyzal, c9)

blaber = Player.find_or_create_by(name: 'Blaber', position_id: top.id)
create_contract(blaber, c9)

bjergsen = Player.find_or_create_by(name: "Bjergsen", position_id: middle.id)
create_contract(bjergsen, tsm)

hauntzer = Player.find_or_create_by(name: "Hauntzer", position_id: top.id)
create_contract(hauntzer, tsm)

Game.find_or_create_by(
  winner_id: clutch.id,
  loser_id: c9.id,
  blue_side_team_id: clutch.id,
  red_side_team_id: c9.id,
  first_blood_team_id: clutch.id,
  first_blood_time: min_and_sec(1, 16),
  first_blood_player_id: hakuho.id,
  first_turret_team_id: clutch.id,
  first_turret_time: min_and_sec(12, 89),
  first_turret_player_id: apollo.id,
  first_turret_type: 1,
  first_dragon_team_id: c9.id,
  first_dragon_time: min_and_sec(12, 04),
  first_dragon_player_id: svenskeren.id,
  first_baron_team_id: clutch.id,
  first_baron_time: min_and_sec(27, 31),
  first_baron_player_id: lira.id,
  date: DateTime.now
)

10.times do
  Game.find_or_create_by(
    winner_id: c9.id,
    loser_id: clg.id,
    red_side_team_id: c9.id,
    blue_side_team_id: clg.id,
    first_blood_team_id: rand > 0.5 ? c9.id : clg.id,
    first_blood_time: rand_min_and_sec,
    first_blood_player_id: c9.players.first.id,
    date: DateTime.now
)
end

User.create!(
  email: 'admin@lcs.com',
  password: 'password123',
  password_confirmation: 'password123'
)
