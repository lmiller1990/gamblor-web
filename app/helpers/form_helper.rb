module FormHelper
  def self.select_for(db_entity)
    db_entity.all.collect { |e| [ e.name, e.id ] }
  end
end
