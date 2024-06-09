import {
  START_FETCHING_CARD,
  SUCCESS_FETCHING_CARD,
  ERROR_FETCHING_CARD,
} from "./constants";

import { getData } from "../../utils/fatch";
import debounce from "debounce-promise";
// import { clearNotif } from '../notif/actions';

let debouncedFetchCard = debounce(getData, 1000);

// START
export const startFetchingCard = () => {
  return {
    type: START_FETCHING_CARD,
  };
};

// SUCCESS
export const successFetchingCard = ({ total }) => {
  return {
    type: SUCCESS_FETCHING_CARD,
    total,
  };
};
//ERROR
export const errorFetchingCard = () => {
  return {
    type: ERROR_FETCHING_CARD,
  };
};

export const fetchTotalOrderSukses = () => {
  return async (dispatch) => {
    dispatch(startFetchingCard());

    try {
      const res = await debouncedFetchCard("/cms/totalSukses");

      dispatch(
        successFetchingCard({
          total: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCard());
    }
  };
};
