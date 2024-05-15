import {
  START_FETCHING_PAKET,
  SUCCESS_FETCHING_PAKET,
  ERROR_FETCHING_PAKET,
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
    case START_FETCHING_PAKET:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_PAKET:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_PAKET:
      return {
        ...state,
        status: statuslist.success,
        data: action.Paket,
      };

    default:
      return state;
  }
}
