FactoryBot.define do
  factory :split do
    name 'summer split'
    start_date "2018-10-01 23:55:11"
    end_date "2018-10-01 23:55:11"
    association :league 
  end
end
