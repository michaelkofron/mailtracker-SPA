class User < ApplicationRecord
    has_secure_password

    has_many :numbers

    validates :username, :presence => true, :uniqueness => {:case_sensitive => false}, :length => {minimum: 3, maximum: 20}
    validates_format_of :username, :with => /^[a-zA-Z0-9](\w|\.)*[a-zA-Z0-9]$/, :multiline => true
    validates :password, length: {minimum: 8, maximum: 30}

end