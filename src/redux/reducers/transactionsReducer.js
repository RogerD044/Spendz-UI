var initFilter = {
  startDate : (new Date((new Date()).setDate(1))).setHours(0,0,0,0),
  endDate : (new Date()).setHours(23,59,59,999),
  dateType:1,
  filterByMonthValue:0,
  filterByLastMonthValue:1
}
const intialState = {
  data: [],
  filters:initFilter
};

export const transactionReducer = (state = intialState.data, { type, payload }) => {
  console.log(payload)
  switch (type) {
    case "SET_DETAILS":
      return { ...state, data: payload };
    default:
      return state;
  }
};

export const filterReducer = (state = intialState.filters, { type, payload }) => {
  console.log(payload)
  switch (type) {
    case "SELECT_FILTERS":
      return { ...state, ...payload };
    default:
      return state;
  }
};
