export const setDetails = (details) => {
  return {
    type: "SET_DETAILS",
    payload: details,
  };
};

export const setFilters = (filters) => {
  return {
    type: "SELECT_FILTERS",
    payload: filters,
  };
};