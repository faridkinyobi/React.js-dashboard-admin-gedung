import {
  SUCCESS_FETCHING_USER,
  ERROR_FETCHING_USER,
  START_FETCHING_USER,
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
    case START_FETCHING_USER:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_USER:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_USER:
      return {
        ...state,
        status: statuslist.success,
        data: !action.Admin? action.Pelanggan : action.Admin
      };
    // case SUCCESS_FETCHING_ADMIN:
    //   return {
    //     ...state,
    //     status: statuslist.success,
    //     dataAdmin: action.Admin,
    //   };

    default:
      return state;
  }
}
