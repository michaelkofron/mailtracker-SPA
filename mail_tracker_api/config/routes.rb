Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/link", to: "links#new"
  post "/signup", to: "users#create", as: :users
  post "/submitnumber", to: "numbers#create"
  post "/login", to: "users#login"
  get "/users", to: "users#all"
  get "/numbers", to: "numbers#all"
end
