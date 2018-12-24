class LeaguePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def create?
    user.admin?
  end

  alias_method :new?, :create?
  alias_method :edit?, :create?
  alias_method :index?, :create?
  alias_method :show?, :create?
  alias_method :destroy?, :create?
end
