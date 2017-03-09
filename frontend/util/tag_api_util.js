export const deleteTagging = (tagging) => {
  return $.ajax({
    method: "DELETE",
    url: "api/taggings",
    data: { tagging }
  });
};
