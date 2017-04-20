export const fetchSearchedItems = (search_term) => {
  return $.ajax({
    method: "GET",
    url: "api/searches",
    data: { search_term }
  });
};
