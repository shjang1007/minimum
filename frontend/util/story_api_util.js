export const fetchStories = () => {
  return $.ajax({
    method: "GET",
    url: "api/stories"
  });
};

export const fetchStory = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${id}`
  });
};

export const fetchStoryAndComments = (parentId) => {
  return $.ajax({
    method: "GET",
    url: `api/stories/${parentId}/comments`
  });
};

export const createStory = (story) => {
  return $.ajax({
    method: "POST",
    url: "api/stories",
    data: { story }
  });
};

export const updateStory = (story) => {
  return $.ajax({
    method: "PATCH",
    url: `api/stories/${story.id}`,
    data: { story }
  });
};

export const updateStoryImage = (formData) => {
  return $.ajax({
    method: "PATCH",
    url: `api/stories/${formData.id}`,
    contentType: false,
    processData: false,
    data: formData,
    dataType: 'json'
  });
};

export const deleteStory = (id) => {
  return $.ajax({
    method: "DELETE",
    url: `api/stories/${id}`
  });
};
