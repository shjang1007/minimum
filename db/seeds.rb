# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

ActiveRecord::Base.transaction do
  User.create(email: "a@a.com", password:"123456", username: "babyshark", name: "Baby Shark")
  User.create(email: "b@b.com", password:"123456", username: "drunkentiger", name: "Drunken Tiger")
end
