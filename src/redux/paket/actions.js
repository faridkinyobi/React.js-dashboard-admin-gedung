import {
  START_FETCHING_PAKET,
  SUCCESS_FETCHING_PAKET,
  ERROR_FETCHING_PAKET,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchPaket = debounce(getData, 1000);

// START
export const startFetchingPaket = () => {
  return {
    type: START_FETCHING_PAKET,
  };
};

// SUCCESS
export const successFetchingPaket = ({ Paket }) => {
  return {
    type: SUCCESS_FETCHING_PAKET,
    Paket,
  };
};
//ERROR
export const errorFetchingPaket = () => {
  return {
    type: ERROR_FETCHING_PAKET,
  };
};

export const fetchPaket = (id, Paket) => {
  return async (dispatch) => {
    dispatch(startFetchingPaket());

    try {
      // await new Promise((delay) => setTimeout(delay, 100));
      let res = await debouncedFetchPaket(
        Paket ? `/cms/pakets/${id}` : "/cms/pakets"
      );
      dispatch(
        successFetchingPaket({
          Paket: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPaket());
    }
  };
};
