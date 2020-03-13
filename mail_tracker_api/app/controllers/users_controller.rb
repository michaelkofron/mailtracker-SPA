class UsersController < ApplicationController


    def all
        @users = User.all

        render json: @users

    end

    def create

        @user = User.create(username: params[:username], password: params[:password])

        object = {user: @user, errors: @user.errors}

        render json: object



    end

    def login
        @user = User.find_by(username: params[:username])

        if @user && @user.authenticate(params[:password])
            render json: {user: @user}
        else
            if @user == nil
                render json: {user: {id: nil}, errors: "Username does not exist"}
            elsif @user && !@user.authenticate(params[:password])
                render json: {user: {id: nil}, errors: "Password is incorrect"}
            end
        end

        #object = {user: @user, errors: @user.errors}

        #render json: Object
    end
end