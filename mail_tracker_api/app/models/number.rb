class Number < ApplicationRecord
    belongs_to :user

    validates :number, :presence => true
end