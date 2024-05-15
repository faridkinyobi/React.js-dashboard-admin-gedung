import {
  START_FETCHING_ORDER,
  SUCCESS_FETCHING_ORDER,
  ERROR_FETCHING_ORDER,
  START_UPDATE_STATUS,
  SUCCESS_UPDATE_STATUS,
  ERROR_UPDATE_STATUS,
  SET_KEYWORD,
  SET_LIMIT,
  SET_PAGE,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  page: 1,
  limit: 1,
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ORDER:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_ORDER:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_ORDER:
      return {
        ...state,
        status: statuslist.success,
        data: !action.Order ? action.totalStatus : action.Order,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    //update
    case START_UPDATE_STATUS:
      return { ...state, status: statuslist.process };

    case ERROR_UPDATE_STATUS:
      return { ...state, status: statuslist.error };

    case SUCCESS_UPDATE_STATUS:
      return { ...state, status: statuslist.success, nofit: action.Status };

    default:
      return state;
  }
}
