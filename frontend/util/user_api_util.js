export const fetchUser = (username) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${username}`
  });
};

export const fetchUserStories = (username) => {
  return $.ajax({
    method: "GET",
    url: `api/users/${username}/stories`
  });
};
