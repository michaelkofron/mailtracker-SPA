class Number < ApplicationRecord
    include ActiveModel::Validations

    belongs_to :user

    validates :number, :presence => true

    validates_with NumberValidator

    def last
        package = Tracker.new(self.number)
        package.last_location
    end

    def coordinates
        package = Tracker.new(self.number)
        package.coordinates
    end
    #last known location of package in JSON

end