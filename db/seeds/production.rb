adc = Position.find_or_create_by(name: 'ADC')
support = Position.find_or_create_by(name: 'Support')
jungle = Position.find_or_create_by(name: 'Jungle')
top = Position.find_or_create_by(name: 'Top')
middle = Position.find_or_create_by(name: 'Middle')

User.create!(
  email: 'admin@lcs.com',
  password: 'password123',
  password_confirmation: 'password123'
)

