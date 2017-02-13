{
  currentUser: {
    id: 1,
    name: "babyshark",
    description: "I am babyshark!",
    image_url: "link/to/profile.img"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    newStory: {errors: ["Title can't be blank", "Content can't be blank"]}
  },
  stories: {
    4: {
      id: 4,
      title: "Title of the story",
      subtitle: "Subtitle of the story",
      content: "Content of the story",
      image_url: "/images/something.jpg",
      author_id: 6,
      published: true,
      like_count: 25,
      published_at: "February 12, 2017"
    }
  },
  userDetail: {
    id: 3,
    email: "babyshark@gmail.com"
    name: "Babyshark",
    image_url: "/link/to/profile.img",
    description: "I am babyshark!",
    following_count: 5,
    follower_count: 1000,
  },
  comments: {
    1: {
      id: 1,
      content: "Always a great article from babyshark",
      story_id: 4,
      author_id: 2,
      author_name: "Drunkentiger",
      author_image_url: "/link/to/profile.img",
      like_count: 0,
      published_at: "February 12, 2017",
    }
  }
}
