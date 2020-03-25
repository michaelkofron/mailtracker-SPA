class NumbersController < ApplicationController

    def all
        numbers = Number.all

        render json: numbers
    end


    def create

        user = User.find_by(username: params[:username], session_key: params[:sessionkey])

        if user.numbers.length <= 10

            if user
                new_number = Number.new(number: params[:number], user_id: user.id)
                if new_number.valid?
                    object = {number: new_number, errors: new_number.errors, allNumbers: user.numbers, info: new_number.last, coordinates: new_number.coordinates}
                    new_number.save
                else
                    object = {number: new_number, errors: new_number.errors, allNumbers: user.numbers}
                end
                render json: object
            else
                new_number = Number.create(number: params[:number])
                object = {number: new_number, errors: new_number.errors}
                render json: object
                new_number.destroy

            end
        else
            object = {number: {user_id: "", id: ""}, number_limit: "You have exceeded your number limit"}
            render json: object
        end

    end

    def load
        user = User.find_by(username: params[:username])

        object = []

        user.numbers.each do |x|
            object << {id: x.id, number: x.number, user_id: x.user_id, info: x.last, coordinates: x.coordinates}
        end
        render json: object
        #render json: user.numbers

    end

    def delete
        user = User.find_by(username: params[:username])

        number = user.numbers.find_by(number: params[:number])

        number.destroy

        render json: number
    end
end