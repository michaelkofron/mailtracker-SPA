class UsersController < ApplicationController


    def all
        users = User.all
        
        render json: users

    end

    def create

        user_account = User.create(username: params[:username], password: params[:password])

        object = {user: user_account, errors: user_account.errors}

        render json: object

    end

    def login
        user_account = User.find_by(username: params[:username])

        if user_account && user_account.authenticate(params[:password])
            render json: {user: user_account}
        else
            if user_account == nil
                render json: {user: {id: nil}, errors: "Username does not exist"}
            elsif user_account && !user_account.authenticate(params[:password])
                render json: {user: {id: nil}, errors: "Password is incorrect"}
            end
        end

        #object = {user: @user, errors: @user.errors}

        #render json: Object
    end

    def marker
        user_account = User.find_by(username: params[:username])

        user_account.update_attribute(:home_marker_lat, params[:lat])
        user_account.update_attribute(:home_marker_lng, params[:lng])

        render json: user_account
    end
end