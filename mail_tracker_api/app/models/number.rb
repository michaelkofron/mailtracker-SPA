class Number < ApplicationRecord
    include ActiveModel::Validations

    belongs_to :user

    validates :number, :presence => true

    validates_with NumberValidator
    validate :uniqueness

    def last
        package = Tracker.new(self.number)
        package.last_location
    end

    def coordinates
        package = Tracker.new(self.number)
        package.coordinates
    end

    def uniqueness
        if user.numbers.where(number: self.number).exists?
            errors.add(:number, "You are already tracking this number")
        end
    end
    #last known location of package in JSON

end