import {
  START_FETCHING_PENYEWA,
  SUCCESS_FETCHING_PENYEWA,
  ERROR_FETCHING_PENYEWA,
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
    case START_FETCHING_PENYEWA:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_PENYEWA:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_PENYEWA:
      return {
        ...state,
        status: statuslist.success,
        data: action.Penyewa,
      };

    default:
      return state;
  }
}
