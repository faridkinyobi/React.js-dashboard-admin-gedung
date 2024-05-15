import {
  START_FETCHING_USER,
  SUCCESS_FETCHING_USER,
  ERROR_FETCHING_USER,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchUser = debounce(getData, 1000);


// START
export const startFetchingUser = () => {
  return {
    type: START_FETCHING_USER,
  };
};

// SUCCESS PELANGGAN
export const successFetchingUser = ({ Pelanggan,Admin, }) => {
  return {
    type: SUCCESS_FETCHING_USER,
    Pelanggan,
    Admin,
  };
};
// SUCCESS ADMIN
// export const successFetchingAdmin = ({ Admin }) => {
//   return {
//     type: SUCCESS_FETCHING_ADMIN,
//     Admin,
//   };
// };
//ERROR
export const errorFetchingUser = () => {
  return {
    type: ERROR_FETCHING_USER,
  };
};

export const fetchPelanggan = () => {
  return async (dispatch) => {
    dispatch(startFetchingUser());

    try {
      let resPelanggan= await debouncedFetchUser("/cms/getpelanggan");
      dispatch(
        successFetchingUser({
          Pelanggan: resPelanggan.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingUser());
    }
  };
};
export const fetchAdmin = () => {
  return async (dispatch) => {
    dispatch(startFetchingUser());

    try {
      let res = await debouncedFetchUser("/cms/getadmin");
      dispatch(
        successFetchingUser({
          Admin: res.data.data
        })
      );
    } catch (error) {
      dispatch(errorFetchingUser());
    }
  };
};
