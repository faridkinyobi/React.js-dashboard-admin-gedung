import {
  START_FETCHING_PAYMENT,
  SUCCESS_FETCHING_PAYMENT,
  ERROR_FETCHING_PAYMENT,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";

let debouncedFetchPayment = debounce(getData, 1000);

// START
export const startFetchingPayment = () => {
  return {
    type: START_FETCHING_PAYMENT,
  };
};

// SUCCESS
export const successFetchingPayment = ({ Payment }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENT,
    Payment,
  };
};
//ERROR
export const errorFetchingPayment = () => {
  return {
    type: ERROR_FETCHING_PAYMENT,
  };
};

export const fetchPayment= () => {
  return async (dispatch) => {
    dispatch(startFetchingPayment());

    try {
      let res = await debouncedFetchPayment("/cms/payments");

      dispatch(
        successFetchingPayment({
          Payment: res.data.data
        })
      );
    } catch (error) {
      dispatch(errorFetchingPayment());
    }
  };
};
