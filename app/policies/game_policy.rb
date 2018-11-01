class GamePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def create?
    user.admin?
  end

  alias_method :new?, :create?
  alias_method :update?, :create?
  alias_method :edit?, :create?
  alias_method :destroy?, :create?
  alias_method :switch_side?, :create?

  def show?
    user.present?
  end

  alias_method :index?, :show?
end
