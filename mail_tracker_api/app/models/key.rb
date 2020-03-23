class Key
    def self.key
        Rails.application.credentials.dig(:map_key)
    end
end