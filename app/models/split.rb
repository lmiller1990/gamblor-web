class Split < ApplicationRecord
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :league_id, presence: true

  belongs_to :league
end
