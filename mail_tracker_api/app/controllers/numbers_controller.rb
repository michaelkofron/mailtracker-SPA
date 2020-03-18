class NumbersController < ApplicationController

    def all
        numbers = Number.all

        render json: numbers
    end


    def create

        user = User.find_by(username: params[:username])

        if user
            new_number = Number.create(number: params[:number], user_id: user.id)
            object = {number: new_number, errors: new_number.errors}
            render json: object
        else
            new_number = Number.create(number: params[:number])
            object = {number: new_number, errors: new_number.errors}
            render json: object
            new_number.destroy

        end

    end

    def load
        user = User.find_by(username: params[:username])

        render json: user.numbers

    end

    def delete
        user = User.find_by(username: params[:username])

        number = user.numbers.find_by(number: params[:number])

        number.destroy

        render json: number
    end
end