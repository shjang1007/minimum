Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: :create
    resource :session, only: [:create, :destroy]
    resources :stories, except: [:new, :edit] do
      get :comments, on: :member
      get :top, on: :collection
      get :brian, on: :collection
      get :nba, on: :collection
      get :lol, on: :collection
      get :food, on: :collection
      get :travel, on: :collection
    end

    resources :taggings, only: :create
    delete :taggings, to: "taggings#destroy"

    resources :likes, only: :create
    delete :likes, to: "likes#destroy"

    get "users/:username", to: "users#show"
    patch "users/:username", to: "users#update"
    get "users/:username/stories", to: "users#stories"
  end
end
