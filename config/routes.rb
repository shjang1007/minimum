Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: :create
    resource :session, only: [:create, :destroy]
    resources :stories, except: [:new, :edit] do
      get :comments, on: :member
    end
    resources :likes, only: :create

    delete :likes, to: "likes#destroy"
    get "users/:username", to: "users#show"
  end
end
