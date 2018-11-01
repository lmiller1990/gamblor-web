require 'rails_helper'

describe GamePolicy do
  let!(:user) { create(:user) }
  let!(:admin) { create(:admin) }
  subject { described_class }

  context 'admin' do
    permissions :destroy?, :index?, :show?, :create?, :update?, :edit?, :new?, :switch_side? do
      it { expect(subject).to permit(admin, Game.new) }
    end
  end

  context 'user' do
    permissions :destroy?, :switch_side?, :create?, :update?, :edit?, :new? do
      it 'denies access' do
        expect(subject).to_not permit(user, Game.new)
      end
    end

    permissions :show?, :index? do
      it 'allows access' do
        expect(subject).to permit(user, Game.new)
      end
    end
  end
end
