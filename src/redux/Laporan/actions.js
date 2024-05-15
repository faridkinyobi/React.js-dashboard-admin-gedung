import {
  START_FETCHING_LAPORAN,
  SUCCESS_FETCHING_LAPORAN,
  ERROR_FETCHING_LAPORAN,
  SET_KEYWORD,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchLaporan = debounce(getData, 1000);

// START
export const startFetchingLaporan = () => {
  return {
    type: START_FETCHING_LAPORAN,
  };
};

// SUCCESS
export const successFetchingLaporan = ({ laporan }) => {
  return {
    type: SUCCESS_FETCHING_LAPORAN,
    laporan,
  };
};

//ERROR
export const errorFetchingLaporan = () => {
  return {
    type: ERROR_FETCHING_LAPORAN,
  };
};
export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const fetchLaporan = () => {
  return async (dispatch) => {
    dispatch(startFetchingLaporan());

    try {
      // let params = {
      //   keyword: getState().laporan.keyword,
      // };

      // await new Promise((delay) => setTimeout(delay, 100));
      let res = await debouncedFetchLaporan("/cms/laporan");
      dispatch(
        successFetchingLaporan({
          laporan: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingLaporan());
    }
  };
};
