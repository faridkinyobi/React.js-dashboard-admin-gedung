import {
  START_FETCHING_ORDERPENDING,
  SUCCESS_FETCHING_ORDERPENDING,
  ERROR_FETCHING_ORDERPENDING,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchOrderPending = debounce(getData, 1000);

// START
export const startFetchingOrderPending = () => {
  return {
    type: START_FETCHING_ORDERPENDING,
  };
};

// SUCCESS
export const successFetchingOrderPending = ({ OrderPending }) => {
  return {
    type: SUCCESS_FETCHING_ORDERPENDING,
    OrderPending,
  };
};
//ERROR
export const errorFetchingOrderPending = () => {
  return {
    type: ERROR_FETCHING_ORDERPENDING,
  };
};

export const fetchOrderPending = () => {
  return async (dispatch) => {
    dispatch(startFetchingOrderPending());

    try {
      // await new Promise((delay) => setTimeout(delay, 100));
      let res = await debouncedFetchOrderPending("/cms/status");
      dispatch(
        successFetchingOrderPending({
          OrderPending: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrderPending());
    }
  };
};
