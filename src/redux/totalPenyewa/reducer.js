import {
  START_FETCHING_CARD,
  SUCCESS_FETCHING_CARD,
  ERROR_FETCHING_CARD,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CARD:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_CARD:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CARD:
      return {
        ...state,
        status: statuslist.success,
        data: !action.total? action.totalStaus:action.total
      };

    default:
      return state;
  }
}
