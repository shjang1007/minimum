# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Story.destroy_all
User.destroy_all
Like.destroy_all

ActiveRecord::Base.transaction do
  admin = User.create(email:"brian@jang.com", password: "briansjang", username: "BekGu", name: "Brian Jang")

  user1 = User.create(email:"guest@example.com", password: "123456", username: "guest123", name: "Guest Account")

  user2 = User.create(email: "irene@kwak.com", password:"irenekwak", username: "Ireneji", name: "Irene Kwak")

  user3 = User.create(email: "b@b.com", password:"123456", username: "drunkentiger", name: "Nick Kimchi")

  user4 = User.create(email: "c@c.com", password:"123456", username: "tablo", name: "Kyle Saurus")

  user5 = User.create(email: "d@d.com", password:"123456", username: "rhythmpower", name: "Matthew Silverman")

  user6 = User.create(email: "e@e.com", password:"123456", username: "dynamicduo", name: "Sharfid Zetman")


  ("f".."z").each do |letter|
    User.create(email: "#{letter}@#{letter}", password: "123456", username: "#{letter}", name: "#{letter}")
  end

  # NBA

  nba1 = Story.create(
    title: "LeBron James",
    sub_title: "The King of the game",
    content: "We are all very fortunate to be born in thie generation to be able to watch how LeBron James plays. He is Michael Jordan of this era. To be honest, he is not my favorite player. In fact, I always found myself cheering against LeBron James. Nothing aginst him, but I just liked the other teams better whether it'd be the Magics with Dwight Howard, the Celtics with Big 3, the Warriors, and the Spurs.
    But we have to give respect to whom respect is due. LeBron James is indeed the king of the court. I truly believe that he can play from 1 to 5 without any big problems. He's smart and he has an amazing physical abilities to execute his smartness. To be able to lead the team by himself to the conference finals and the finals? That's something special.",
    published: true,
    published_at: Date.new(2016, 3, 14).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/lbj.jpg",
    tag_names: ["nba"]
  )

  nba2 = Story.create(
    title: "Stephen Curry",
    sub_title: "The Three Point King",
    content: "Started from the bottom, now we're here.

    Stephen Curry's journey to the NBA has been something special. Despite being labeled as under-sized to play in the NBA, he broke all the barriers and is now two times MVP of the league.",
    published: true,
    published_at: Date.new(2017, 3, 11).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/curry.jpg",
    tag_names: ["nba"]
  )

  nba3 = Story.create(
    title: "Kristaps Porzingis",
    sub_title: "The Unicorn",
    content: "A bright light to the Knicks franchise.

    Many people were sad and cried over drafting Porzingis at first, but now the Knicks fans cry out of joy that the Knicks have somewhat bright future a head of them. Porzingis is truly a unicorn as we have never seens a player this tall be able to do everything. All hail the newly crowned All-Star skills challenge winner",
    published: true,
    published_at: Date.new(2017, 3, 12).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/porzingis.jpg",
    tag_names: ["nba"]
  )

  nba4 = Story.create(
    title: "Tim Duncan",
    sub_title: "The Big Fundamental",
    content: "Always humble when approaching the game of the basketball.

    He is called 'the Big Fundamental' for a reason. He may not look fancy with his moves, but his fundamentals will leave you speechless. Sure to become a hall of fame, his career was something special. It's just sad to see the game without Tim Duncan",
    published: true,
    published_at: Date.new(2017, 3, 13).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/duncan.jpg",
    tag_names: ["nba"]
  )

  nba5 = Story.create(
    title: "Kyrie Irving",
    sub_title: "Uncle Drew",
    content: "Don't reach young blood.

    Uncle Drew's got one of the best if not the best handles in the game. Just pure talent on the basketball court. It's all on Kyrie's hand. If Kyrie misses his shots, it's not because of the defenders, but Kyrie that just missed it. Even if you are not a fan of the game of the basketball, once you see his good old english spin on the basketball when he goes up for a layup, you will fall in love with this game.",
    published: true,
    published_at: Date.new(2017, 3, 10).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/irving.png",
    tag_names: ["nba"]
  )

  # League of Legends

  lol1 = Story.create(
    title: "Kennen",
    sub_title: "Eye of the Storm!",
    content: "There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou and it employs a triumvirate of shadow warriors to uphold its causes in the world. Kennen is one of these shadow warriors, entrusted with the sacred duty of Coursing the Sun - tirelessly conveying the justice of the Kinkou.

Kennen was born in Bandle City and it was said that in his first living moments he bolted first from the womb and second from the midwife who delivered him. His parents had thought that he would outgrow his boundless energy, but as he matured his energy found no limits and was matched only by his unnerving speed. Despite his astonishing gifts, he remained unnoticed (or at least uncaught, as he was quite the prankster) until, on a dare, he ran straight up the great outer wall of the Placidium. When word of this feat reached Kinkou ears, Kennen was quickly and quietly brought in for an audience. He found that the role of the Heart of the Tempest suited him, frenetically delivering both the word and the punishments of the Kinkou across the realm. He now works with his fellows Akali and Shen to enforce the balance of Valoran. This hallowed pursuit has unsurprisingly led the triumvirate to the Fields of Justice.

'The Heart of the Tempest beats eternal...and those beaten remember eternally.'",
    published: true,
    published_at: Date.new(2017, 3, 1).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/kennen.jpg",
    tag_names: ["lol"]
  )


  lol2 = Story.create(
    title: "Fizz",
    sub_title: "The Tidal Trickster",
    content: "Centuries ago, an ancient water-dwelling race built a hidden city beneath a mountain in the sea. Though these creatures had their enemies, the city was an impenetrable fortress, and, in the safety it provided, they grew complacent. Fizz, however, harbored a curious spirit that could not be satisfied living so cushioned a life. Unable to resist the allure of danger, Fizz had a habit of sneaking out of the city to look for trouble. In his many adventures he grew to be a powerful fighter with a keen resourcefulness that let him skirt danger with clever ease. One day, Fizz returned to find the city abandoned: his people had vanished, leaving Fizz without a clue to explain their disappearance. With nothing left in the city to keep him, Fizz salvaged an enchanted trident from the ruins and set out alone.

For years, Fizz wandered the ocean, using the skills he'd learned during his adventures as a young boy to survive. Finally, Fizz discovered the port of Bilgewater. He was fascinated with the existence of life above the water and could not resist exploring the island. In his endless curiosity, Fizz inadverently meddled in the affairs of the humans who lived there and his presence did not go unnoticed. His mischief angered many residents who eventually sought to capture or kill him. Fizz found himself cornered, and he prepared to return to the sea despite the fondness he'd come to hold for Bilgewater. As he stood at the docks, a massive dragon-shark attacked the port. Fizz defeated the beast, using his resourcefulness and knowledge of the creatures' weaknesses to his advantage. Having earned the gratitude and respect of the humans, Fizz decided to stay in Bilgewater. He joined the League of Legends to further serve his new home.",
    published: true,
    published_at: Date.new(2017, 3, 2).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/fizz.jpg",
    tag_names: ["lol"]
  )

  lol3 = Story.create(
    title: "Darius",
    sub_title: "The Hand of Noxus",
    content: "There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened warrior. Orphaned at a young age, Darius had to fight to keep himself and his younger brother alive. By the time he joined the military, he had already developed the strength and discipline of a veteran soldier. The first true test of Darius's resolve occurred in a crucial battle against Demacia, where the Noxian forces were exhausted and outnumbered. Darius's captain called for his troops to retreat, but Darius refused to accept such an act of cowardice. Breaking formation, Darius strode towards the captain and decapitated him with one sweep of his gigantic axe. Both terrified and inspired, the soldiers followed Darius into battle and fought with incredible strength and fervor. After a long and grueling battle, they ultimately emerged victorious.

Seizing momentum from this victory, Darius led his now fiercely loyal troops in a devastating campaign against Demacia. After proving his power on the battlefield, Darius turned his gaze homeward. He saw a Noxus riddled with weakness, where greedy, complacent nobles drained the nation's strength. Seeking to restore his country to greatness, Darius took it upon himself to reshape the Noxian leadership. He identified weak figureheads and violently removed them from their positions of power. Many in Noxus saw Darius's cull as an attempt to seize power, but he had a different plan for the throne. He had been watching the rise of Jericho Swain with keen interest. In Swain, Darius saw a leader with the mind and determination to bring Noxus to glory. Now allied with the Master Tactician, Darius works to unite the nation behind his vision of true Noxian strength.

'A united Noxus could control the world - and would deserve to.'",
    published: true,
    published_at: Date.new(2017, 3, 3).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/darius.jpg",
    tag_names: ["lol"]
  )

  lol4 = Story.create(
    title: "Jinx",
    sub_title: "The Loose Cannon",
    content: "Jinx lives to wreak havoc without a thought for the consequences, leaving a trail of mayhem and panic in her wake. A manic and impulsive criminal, she despises nothing more than boredom, and gleefully brings her own volatile brand of pandemonium to the one place she finds dullest: Piltover. With an arsenal of deadly toys, she unleashes the brightest explosions and loudest blasts - all the better to shock and surprise the hapless authorities. Always just out of the law's reach, Jinx's favorite game is to toy with Piltover's finest - especially Vi.

Piltover had long been known as the City of Progress, a place where peace and order reigned. That serenity was challenged when a new kind of criminal arrived, the likes of whom had never been seen. This mysterious outlaw unleashed a series of warped and destructive capers that endangered the entire city, and left its people reeling from the worst crime spree in Piltover's history.

As the string of crimes without rhyme or reason hit the city, sightings of the lawbreaker emerged. Though the young woman's origins were a mystery, some saw traces of Piltover hextech in her firearms, while others described the street fashions of Zaun in her dress. Because her arrival always brought trouble with it, those who crossed her path soon gave her a name: Jinx.

As Jinx's rampage escalated, Caitlyn - the sheriff of Piltover - responded by declaring a state of emergency and organizing a city-wide manhunt. In typical Jinx fashion, the criminal marked the Piltover treasury, the city's most secure building, with a direct challenge to its most abrasive officer. With a caricature of Vi's face splashed across the treasury's facade, and a scribbled time and date of her supposed raid, Jinx was openly daring the enforcer to stop her from robbing it.

Determined to put the troublemaker behind bars, Vi watched and waited outside the treasury until Jinx's time had finally come. True to her scrawled promise, the smiling menace showed her face. Knowing this was her chance to capture the outlaw, Vi gave chase into the building's interior. She smashed through wall after wall to chase down Jinx, who giggled as she lit up the evacuated treasury with fiery explosions. Vi finally cornered the criminal inside the vault, but Jinx wasn't done just yet. With a maniacal laugh, she fired a barrage of rockets, bringing the entire building down upon them both.

When Vi finally crawled out of the ruins, the battered enforcer found no trace of Jinx. Adding insult to injury, not a single ounce of gold had been taken from the ruined vault. Instead, the criminal left a parting message to her favorite officer of the law - a challenge only now visible through the gaping opening in Piltover's skyline. The lights of the city spelled out a simple taunt: you'll never catch me. As Vi read the message, she heard the distant laughter of her new nemesis, and the city plunged into utter darkness for the very first time.

'Oh look - I'm opening my box of care! Oh wait - it's empty!'",
    published: true,
    published_at: Date.new(2017, 3, 4).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/jinx.jpg",
    tag_names: ["lol"]
  )

  lol5 = Story.create(
    title: "Amumu",
    sub_title: "The Sad Mummy",
    content: "'Solitude can be lonelier than death.'

A lonely and melancholy soul from ancient Shurima, Amumu roams the world in search of a friend. Cursed by an ancient spell, he is doomed to remain alone forever, as his touch is death and his affection ruin. Those who claim to have seen him describe Amumu as a living cadaver, small in stature and covered in bandages the color of lichen. Amumu has inspired myths, folklore, and legends told and retold for generations - such that it is impossible to separate truth from fiction.",
    published: true,
    published_at: Date.new(2017, 3, 5).strftime("%b %-d"),
    author_id: admin.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/amumu.jpg",
    tag_names: ["lol"]
  )

  # Foods

  food1 = Story.create(
    title: "Sashimi",
    sub_title: "Haein Restaurant in Flushing Queens",
    content: "It's not just the decoration, but look at the beautiful sashimi pieces.",
    published: true,
    published_at: Date.new(2017, 3, 6).strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/sashimi.jpeg",
    tag_names: ["food"]
  )

  food2 = Story.create(
    title: "Hamburger with rare beef and Tartare",
    sub_title: "The best restaurant from Firenze!",
    content: "When I was in Firenze, my aunt, who currently lives in Firenze, took me to this retaurant. Situated right by the Arno river, this resturant is fantastic.",
    published: true,
    published_at: Date.new(2017, 3, 7).strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/italy.jpeg",
    tag_names: ["food"]
  )

  food3 = Story.create(
    title: "Steak",
    sub_title: "Another good one from Firenze",
    content: "Totally a local gem. Couldn't find any foreigners as far as I know. This place made me feel like I was in Italy. Look at those juicy steak.",
    published: true,
    published_at: Date.new(2017, 3, 8).strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/steak.jpeg",
    tag_names: ["food"]
  )

  food4 = Story.create(
    title: "Sam-Gyeop-Sal",
    sub_title: "The Famous Korean Pork Belly",
    content: "If you ever go to Korea, this is a must food that you have to try. Just be careful, because once you fall in love with this food, there's no coming back. Hit me up when you want to go eat Sam Gyeop Sal with me!",
    published: true,
    published_at: Date.new(2017, 3, 9).strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/3gyup.jpeg",
    tag_names: ["food"]
  )

  food5 = Story.create(
    title: "Chocolate",
    sub_title: "Stick with me NYC!",
    content: "How can we have a list of food without a sweet dessert. My favorite chocolate in NYC. Must try it!",
    published: true,
    published_at: Date.new(2017, 3, 10).strftime("%b %-d"),
    author_id: user2.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/chocolate.jpeg",
    tag_names: ["food"]
  )

  # Travel

  travel1 = Story.create(
    title: "Seoul",
    sub_title: "The capital city of South Korea",
    content: "Probably the first thing that comes to mind of many people when you hear the word South Korea. The capital city, Seoul is a fantastic place to visit. Name it you shall find it.",
    published: true,
    published_at: Date.new(2017, 3, 11).strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/seoul.jpg",
    tag_names: ["travel"]
  )

  travel2 = Story.create(
    title: "Busan",
    sub_title: "The second biggest city in South Korea, known for summer vacation hot spot",
    content: "Situated on the most south side of Korea, it's a famous vacation spot for many that craves the smell of ocean. That of course means a lot of 'beaches' and seafoods!",
    published: true,
    published_at: Date.new(2017, 3, 12).strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/busan.jpg",
    tag_names: ["travel"]
  )

  travel3 = Story.create(
    title: "Jeju Island",
    sub_title: "Beautiful island with beautiful weather.",
    content: "Just a must go to place. This one sentence does it all.",
    published: true,
    published_at: Date.new(2017, 3, 13).strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/jeju.jpg",
    tag_names: ["travel"]
  )

  travel4 = Story.create(
    title: "Kyung Ju",
    sub_title: "A city where Korean History lives",
    content: "Kyung Ju is a city where the old Korean dynasty called 'Shin-la' built its empire on. Therefore, it has a lot of historical architectures. Go to Kyung Ju if you want a little taste of what Korea was like back in the days.",
    published: true,
    published_at: Date.new(2017, 3, 14).strftime("%b %-d"),
    author_id: user1.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/kyungju.jpg",
    tag_names: ["travel"]
  )

  # Cartoon

  story1 = Story.create(
    title: "Lion King",
    sub_title: "Lyric to 'I just can't wait to be King",
    content: "I'm gonna be a mighty king
So enemies beware!
Well, I've never seen a king of beasts
With quite so little hair
I'm gonna be the mane event
Like no king was before

I'm brushing up on looking down
I'm working on my ROAR
Thus far, a rather uninspiring thing
Oh, I just can't wait to be king!
(You've rather a long way to go, young master
if you think)

No one saying do this
(Now when I said that, I)
No one saying be there
(What I meant was)
No one saying stop that
(Look, what you don't realize)

No one saying see here
(Now see here!)
Free to run around all day
(Well, that's definitely out)
Free to do it all my way!
I think it's time that you and I

Arranged a heart to heart
Kings don't need advice
From little hornbills for a start
If this is where the monarchy is headed
Count me out!
Out of service, out of Africa

I wouldn't hang about
This child is getting wildly out of wing
Oh, I just can't wait to be king!
Everybody look left
Everybody look right
Everywhere you look I'm

Standing in spotlight!
Not yet!
Let every creature go for broke and sing
Let's hear it in the herd and on the wing
It's gonna be King Simba's finest fling
Oh, I just can't wait to be king!
Oh, I just can't wait to be king!
Oh, I just can't wait to be king!",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/lion-king.jpg",
    tag_names: ["cartoon"]
  )

  story3 = Story.create(
    title: "Mulan",
    sub_title: "Lyric to 'I will make a man out of you'",
    content: "Let's get down to business
To defeat the Huns
Did they send me daughters when I asked for sons?
You're the saddest bunch I ever met
But you can bet before we're through
Mister, I'll make a man out of you

Tranquil as a forest
But on fire within
Once you find your center
You are sure to win
You're a spineless, pale, pathetic lot
And you haven't got a clue
Somehow I'll make a man out of you

I'm never gonna catch my breath
Say goodbye to those who knew me
Boy, was I a fool in school for cutting gym
This guy's got 'em scared to death
Hope he doesn't see right through me
Now I really wish that I knew how to swim

(Be a man)
You must be swift as a coursing river
(Be a man)
With all the force of a great typhoon
(Be a man)
With all the strength of a raging fire
Mysterious as the dark side of the moon

Time is racing toward us till the Huns arrive
Heed my every order and you might survive
You're unsuited for the rage of war
So pack up, go home you're through
How could I make a man out of you?

(Be a man)
You must be swift as a coursing river
(Be a man)
With all the force of a great typhoon
(Be a man)
With all the strength of a raging fire
Mysterious as the dark side of the moon",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user5.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/mulan.JPG",
    tag_names: ["cartoon"]
  )

  story3 = Story.create(
    title: "Tom caught Jerry",
    sub_title: "Something that would have never happened in the actual story plot",
    content: "I can already predict what you have happened after this picture. Jerry will pull a quick trick on Tom, and run away. Then, when Tom chases down Jerry, he will probably bang his hand on a shovel, and knock down.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user3.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry1.jpg",
    tag_names: ["cartoon"]
  )

  story4 = Story.create(
    title: "Classic Tom and Jerry",
    sub_title: "Can Tom ever catch smart little Jerry?",
    content: "I don't know about you, but I was a big fan of Tom. So I found myself always cheering for Tom, but it never happened.",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user4.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry2.png",
    tag_names: ["cartoon"]
  )

  story5 = Story.create(
    title: "What if Tom and Jerry were friends?",
    sub_title: "The classic cartoon that we all love",
    content: "If Tom and Jerry were friends like this, the show definitely wouldn't have been fun. However, it is good to see both of them smiling",
    published: true,
    published_at: Date.today.strftime("%b %-d"),
    author_id: user5.id,
    image: "https://s3.amazonaws.com/minimum-dev/minimum-static-images/tom-jerry3.png",
    tag_names: ["cartoon"]
  )

  # Comments

  50.times do
    parent_id = ((Story.first.id)..(Story.last.id)).to_a.sample
    author_id = ((User.first.id)..(User.last.id)).to_a.sample

    content = ["Awesome story that you have composed!", "I love this story!", "Can you write another story like this?", "I don't like this story, I am just a hater.", "This story made me smile", "This is totally irrelevant, but ball is life!", "Enjoyed your story, thumbs up", "Can you do better than this?", "Surely I can fall in love this story"]

    Story.create(
      content: content.sample,
      published: true,
      published_at: Date.today.strftime("%b %-d"),
      author_id: author_id,
      parent_id: parent_id
    )
  end

  # Likes

  User.all.each do |user|
    story_ids = (((nba1.id)..(story5.id)).to_a.shuffle)[0..9]
    story_ids.each do |story_id|
      Like.create(user_id: user.id, story_id: story_id)
    end
  end
end
