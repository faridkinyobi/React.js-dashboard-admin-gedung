import {
  START_FETCHING_BUKTI,
  SUCCESS_FETCHING_BUKTI,
  ERROR_FETCHING_BUKTI,
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
    case START_FETCHING_BUKTI:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_BUKTI:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_BUKTI:
      return {
        ...state,
        status: statuslist.success,
        data: action.Bukti,
      };

    default:
      return state;
  }
}
