# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Story.destroy_all

ActiveRecord::Base.transaction do
  user1 = User.create(email:"guest@example.com", password: "123456", username: "guest123", name: "Guest Account")

  user2 = User.create(email: "a@a.com", password:"123456", username: "babyshark", name: "Baby Shark")

  user3 = User.create(email: "b@b.com", password:"123456", username: "drunkentiger", name: "Drunken Tiger")

  story1 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user1.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story2 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user1.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story3 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story4 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story5 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story6 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: File.open(File.join(Rails.root, "app/assets/images/pooh-and-friends.png"))
  )

  story7 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "In the beginning God created the heavens and the earth. 2 Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    parent_id: story1.id
  )

  story8 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "In the beginning God created the heavens and the earth. 2 Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    parent_id: story1.id

  )

  story9 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "In the beginning God created the heavens and the earth. 2 Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    parent_id: story1.id
  )

  story9 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "And God said, “Let there be light,” and there was light. 4 God saw that the light was good, and he separated the light from the darkness. 5 God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.",
    published: false,
    author_id: user2.id,
    parent_id: story1.id
  )
end
