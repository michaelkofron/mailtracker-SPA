class Number < ApplicationRecord
    belongs_to :user

    validates :number, :presence => true, :format => { with: /\A\d+\z/, message: "Integer only. No sign allowed." }

end