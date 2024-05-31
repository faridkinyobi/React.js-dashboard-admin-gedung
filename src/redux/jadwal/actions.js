import {
  START_FETCHING_JADWAL,
  SUCCESS_FETCHING_JADWAL,
  ERROR_FETCHING_JADWAL,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchJadwal = debounce(getData, 1000);

// START
export const startFetchingJadwal = () => {
  return {
    type: START_FETCHING_JADWAL,
  };
};

// SUCCESS
export const successFetchingJadwal = ({ Jadwal }) => {
  return {
    type: SUCCESS_FETCHING_JADWAL,
    Jadwal,
  };
};

//ERROR
export const errorFetchingJadwal = () => {
  return {
    type: ERROR_FETCHING_JADWAL,
  };
};

export const fetchJadwal = (id, jadwal) => {
  return async (dispatch) => {
    dispatch(startFetchingJadwal());

    try {
      // await new Promise((delay) => setTimeout(delay, 100));
      let res = await debouncedFetchJadwal(
        jadwal ? `/cms/jadwal/${id}` : "/cms/jadwal"
      );

      dispatch(
        successFetchingJadwal({
          Jadwal: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingJadwal());
    }
  };
};
