class Contract < ApplicationRecord
  belongs_to :player
  belongs_to :team

  scope :past, -> { where('end_date < ?', DateTime.now) }
  scope :ongoing, -> do
    having('end_date > ?', DateTime.now)
      .or(Contract.where('end_date = ?', nil))
  end


end
