import {
  START_FETCHING_ORDER,
  SUCCESS_FETCHING_ORDER,
  ERROR_FETCHING_ORDER,
  START_UPDATE_STATUS,
  SUCCESS_UPDATE_STATUS,
  ERROR_UPDATE_STATUS,
  SET_KEYWORD,
  SET_LIMIT,
  SET_PAGE,
} from "./constants";

import { getData, putData } from "../../utils/fatch";
import debounce from "debounce-promise";

let debouncedFetchOrder = debounce(getData, 1000);
let debouncedUpdateStatus = debounce(putData, 800);

//aksi  FetchingOrder
// START
export const startFetchingOrder = () => {
  return {
    type: START_FETCHING_ORDER,
  };
};

// SUCCESS
export const successFetchingOrder = ({ Order, totalStatus,pages }) => {
  return {
    type: SUCCESS_FETCHING_ORDER,
    Order,
    totalStatus,
    pages
  };
};

//ERROR
export const errorFetchingOrder = () => {
  return {
    type: ERROR_FETCHING_ORDER,
  };
};
//end

//start aksi Order Update Status
export const startUpdateOrderStatus = () => {
  return {
    type: START_UPDATE_STATUS,
  };
};

// SUCCESS
export const successUpdateOrderStatus = ({ Status }) => {
  return {
    type: SUCCESS_UPDATE_STATUS,
    Status,
  };
};

//ERROR
export const errorUpdateOrderStatus = () => {
  return {
    type: ERROR_UPDATE_STATUS,
  };
};
//end

//Update Status Order
export const UpdateOrderStatus = (id, gagal, dp, proses) => {
  return async (dispatch) => {
    dispatch(startUpdateOrderStatus());

    try {
      await debouncedUpdateStatus(
        `${gagal ? `/cms/statusGagal/${id}` :  dp? `/cms/statusDp/${id}` : proses ? `/cms/statusProses/${id}` : `/cms/statusSukses/${id}`}`
      );
      dispatch(
        successUpdateOrderStatus({
          Status: "sukses",
        })
      );
    } catch (error) {
      dispatch(errorUpdateOrderStatus());
    }
  };
};

// fetch Total Status Pending
export const fetchTotalStatusPending = () => {
  return async (dispatch) => {
    dispatch(startFetchingOrder());

    try {
      // await new Promise((delay) => setTimeout(delay, 100));
      let res = await debouncedFetchOrder("/cms/totalPending");
      dispatch(
        successFetchingOrder({
          totalStatus: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrder());
    }
  };
};

// fetch Order
export const fetchOrder = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingOrder());

    try {
      let params = {
        page: getState().Order?.Page || 1,
        limit: getState().Order?.limit || 10,
        keyword: getState().Order.keyword,
      };

      // await new Promise((delay) => setTimeout(delay, 100));
      const res = await debouncedFetchOrder("/cms/ordersAll", params);
      dispatch(
        successFetchingOrder({
          Order: res.data.data.order,
          pages: res.data.data.pages
        })
      );
    } catch (error) {
      dispatch(errorFetchingOrder());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  limit,
});
