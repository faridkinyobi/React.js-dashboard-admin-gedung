import {
  START_FETCHING_BUKTI,
  SUCCESS_FETCHING_BUKTI,
  ERROR_FETCHING_BUKTI,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";

let debouncedFetchBukti= debounce(getData, 1000);

// START
export const startFetchingBukti = () => {
  return {
    type: START_FETCHING_BUKTI,
  };
};

// SUCCESS
export const successFetchingBukti = ({ Bukti }) => {
  return {
    type: SUCCESS_FETCHING_BUKTI,
    Bukti,
  };
};
//ERROR
export const errorFetchingBukti = () => {
  return {
    type: ERROR_FETCHING_BUKTI,
  };
};

export const fetchBukti= (id,ById) => {
  return async (dispatch) => {
    dispatch(startFetchingBukti());

    try {
      const res = await debouncedFetchBukti(ById?`/cms/pembayaran/${id}`:"/cms/pembayaran");
      dispatch(
        successFetchingBukti({
          Bukti: res.data.data
        })
      );
    } catch (error) {
      dispatch(errorFetchingBukti());
    }
  };
};
