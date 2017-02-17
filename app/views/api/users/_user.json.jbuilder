json.extract! user, :id, :email, :username, :name
json.avatar_url asset_path(user.avatar.url(:default))
