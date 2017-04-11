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

export const updateUserInfo = (formData) => {
  return $.ajax({
    method: "PATCH",
    url: `api/users/${formData.username}`,
    contentType: false,
    processData: false,
    data: formData,
    dataType: "json"
  });
};
