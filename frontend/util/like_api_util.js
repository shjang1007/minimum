export const createLike = (like) => {
  return $.ajax({
    method: "POST",
    url: "api/likes",
    data: { like }
  });
};

export const deleteLike = (id) => {
  return $.ajax({
    method: "DESTROY",
    url: `api/likes/${id}`
  });
};
