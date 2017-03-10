export const createTagging = (story_id, name) => {
  return $.ajax({
    method: "POST",
    url: "api/taggings",
    data: { story_id, name }
  });
};

export const deleteTagging = (story_id, name) => {
  return $.ajax({
    method: "DELETE",
    url: "api/taggings",
    data: { story_id, name }
  });
};
