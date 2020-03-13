Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/link", to: "links#new"
  post "/signup", to: "users#create", as: :users
  post "/login", to: "users#login"
  get "/users", to: "users#all"
end
