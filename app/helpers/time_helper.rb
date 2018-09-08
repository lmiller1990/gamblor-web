module TimeHelper
  def gametime(time)
    time.strftime('%M:%S') unless time.nil?
  end
end
