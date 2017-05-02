export const createFollow = (follow) => {
  return $.ajax({
    method: "POST",
    url: "api/follow",
    data: { follow }
  });
};

export const deleteFollow = (follow) => {
  return $.ajax({
    method: "DELETE",
    url: `api/follow`,
    data: { follow }
  });
};
