import {
  START_FETCHING_PENYEWA,
  SUCCESS_FETCHING_PENYEWA,
  ERROR_FETCHING_PENYEWA,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchPenyewa = debounce(getData, 1000);

// START
export const startFetchingPenyewa = () => {
  return {
    type: START_FETCHING_PENYEWA,
  };
};

// SUCCESS
export const successFetchingPenyewa = ({ Penyewa }) => {
  return {
    type: SUCCESS_FETCHING_PENYEWA,
    Penyewa,
  };
};
//ERROR
export const errorFetchingPenyewa = () => {
  return {
    type: ERROR_FETCHING_PENYEWA,
  };
};

export const fetchPenyewa= () => {
  return async (dispatch) => {
    dispatch(startFetchingPenyewa());

    try {
      let res = await debouncedFetchPenyewa("/cms/penyewa");
      dispatch(
        successFetchingPenyewa({
          Penyewa: res.data.data
        })
      );
    } catch (error) {
      dispatch(errorFetchingPenyewa());
    }
  };
};
