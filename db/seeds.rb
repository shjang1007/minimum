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

  user2 = User.create(email: "a@a.com", password:"123456", username: "babyshark", name: "Daniel Kim")

  user3 = User.create(email: "b@b.com", password:"123456", username: "drunkentiger", name: "Brian Lee")

  user4 = User.create(email: "c@c.com", password:"123456", username: "tablo", name: "David Shin")

  user5 = User.create(email: "d@d.com", password:"123456", username: "rhythmpower", name: "Chris Park")

  user6 = User.create(email: "e@e.com", password:"123456", username: "dynamicduo", name: "Matthew Han")

  story1 = Story.create(
    title: "Lion King",
    sub_title: "Quotes from Lion King",
    content: "It’s times like this my buddy Timon here says: you got to put your behind in your past. – Pumbaa

It’s important to always look where you’re headed rather than where you were!

Oh yes, the past can hurt. But from the way I see it, you can either run from it, or learn from it. – Rafiki

Even Rafiki knows that every day is a lesson in itself. Enjoy the ride!

I laugh in the face of danger. – Simba

Don’t let danger control you. Embrace a challenge—you never know where it will take you. Just don’t go around visiting elephant graveyards, okay?

What do you want me to do, dress in drag and do the hula?! – Timon

Ahh … a quintessential and classic line. Always a great distraction.

But, Zazu, you told me they are nothing but slobbery, mangy stupid poachers. – Simba

Ouch. Simba sure knows how to throw some shade.

Remember who you are. – Mufasa

It’s easy to forget at times, but nothing is more important.

Being brave doesn’t mean you go looking for trouble. – Mufasa

What it does mean is that you’re mature enough to understand your fears and overcome them.

There’s one in every family, sire. Two in mine, actually. And they always manage to ruin special occasions. – Zazu

Because … ya know. Uncles.

Everything you see exists together in a delicate balance. As king, you need to understand that balance and respect all the creatures, from the crawling ant to the leaping antelope. – Mufasa

Otherwise known as embracing the great circle of life.

What’s a motto?” “Nothing, what’s the motto with you? – Simba and Timon",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/lion-king.jpg"
  )

  story2 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/micky1.png"
  )

  story3 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/mulan.JPG"
  )

  story4 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/pooh1.png"
  )

  story5 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/pooh2.png"
  )

  story6 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/pooh3.png"
  )

  story7 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/snoopy1.png"
  )

  story8 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/snoopy2.png"
  )

  story9 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry1.jpg"
  )

  story10 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry2.png"
  )

  story11 = Story.create(
    title: Faker::Food.ingredient,
    sub_title: Faker::Color.color_name,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry3.png"
  )

  25.times do
    parent_id = ((Story.first.id)..(Story.last.id)).to_a.sample
    author_id = ((User.first.id)..(User.last.id)).to_a.sample

    Story.create(
      content: Faker::HarryPotter.quote,
      published: true,
      published_at: Date.today.strftime("%b %-d"),
      author_id: author_id,
      parent_id: parent_id
    )
  end
end
