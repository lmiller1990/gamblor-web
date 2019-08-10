FactoryBot.define do
  factory :split do
    name do 'summer split' end
    start_date do "2018-10-01 23:55:11" end
    end_date do "2018-10-01 23:55:11" end
    association :league 
  end
end
