class SimulationResult < Struct.new(
  :date, 
  :team,
  :opponent,
  :market, 
  :ev, 
  :odds, 
  :bet_amount, 
  :result # 1 for win, 0 for loss
)
end

