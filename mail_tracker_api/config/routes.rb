Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/link", to: "links#new" 

  post "/signup", to: "users#create", as: :users #signup
  post "/login", to: "users#login" #logs in

  post "/submitnumber", to: "numbers#create" #submits a number
  post "/loadnumbers", to: "numbers#load" #post request on sign in, returns all of a user's numbers

  get "/users", to: "users#all" #all users
  get "/numbers", to: "numbers#all" #all numbers
end
