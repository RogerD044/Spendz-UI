import { combineReducers } from "redux";
import { transactionReducer, filterReducer } from "./transactionsReducer";
const reducers = combineReducers({
  detailPageData: transactionReducer,
  filters: filterReducer,
});
export default reducers;
