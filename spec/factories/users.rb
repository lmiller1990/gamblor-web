FactoryBot.define do
  factory :user do
    email do 'test@test.com' end
    password do 'password'     end
    password_confirmation do 'password'     end
  end

  factory :admin, class: 'User' do
    email do 'admin@test.com' end
    admin do true end
    password do 'password'     end
    password_confirmation do 'password'     end
  end
end
