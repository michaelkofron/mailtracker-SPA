class NumberValidator < ActiveModel::Validator
    def validate(record)
        new_number = Tracker.new(record.number)

        if new_number.carrier == nil
            record.errors[:number] << "Not a valid tracking number"
        else
            if new_number.tracking_info["error"]
                record.errors[:number] << "#{new_number.carrier.upcase} code, but no info."
            end
        end
            
    end
end

#sometimes tracking numbers are valid but have no info