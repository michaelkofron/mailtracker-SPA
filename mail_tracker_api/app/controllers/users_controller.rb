class UsersController < ApplicationController


    def all
        @users = User.all

        render json: @users

    end

    def create

        @user = User.create(username: params[:username], password: params[:password])

        render json: @user



    end
end