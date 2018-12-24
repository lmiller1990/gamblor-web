require 'rails_helper'

describe LeaguePolicy do
  let!(:user) { create(:user) }
  let!(:admin) { create(:admin) }
  subject { described_class }

  context 'admin' do
    permissions :index?, :show?, :create?, :edit?, :new?, :destroy? do
      it 'allows access' do
        expect(subject).to permit(admin, Game.new) 
      end
    end
  end

  context 'user' do
    permissions :index?, :show?, :create?, :edit?, :new?, :destroy?  do
      it 'denies access' do
        expect(subject).to_not permit(user, Game.new)
      end
    end
  end
end
