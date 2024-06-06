import {
  START_FETCHING_LAPORAN,
  SUCCESS_FETCHING_LAPORAN,
  ERROR_FETCHING_LAPORAN,
  SET_START_DATE,
  SET_END_DATE,
  SET_LIMIT,
  SET_PAGE,
} from "./constants";

import { getData } from "../../utils/fatch";
import moment from "moment";
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
export const successFetchingLaporan = ({
  laporan,
  pages,
  totalDebit,
  totalKredit,
  saldo,
}) => {
  return {
    type: SUCCESS_FETCHING_LAPORAN,
    laporan,
    pages,
    totalDebit,
    totalKredit,
    saldo,
  };
};

//ERROR
export const errorFetchingLaporan = () => {
  return {
    type: ERROR_FETCHING_LAPORAN,
  };
};

export const fetchLaporan = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingLaporan());

    try {
      let params = {
        page: getState().Laporan?.page || 1,
        limit: getState().Laporan?.limit || 10,
        startDate: moment(getState().Laporan?.startDate).format("YYYY-MM-DD"),
        endDate: moment(getState().Laporan?.endDate).format("YYYY-MM-DD"),
      };
      const res = await debouncedFetchLaporan("/cms/laporan", params);
      dispatch(
        successFetchingLaporan({
          laporan: res.data.data.data,
          pages: res.data.data.pages,
          totalDebit: res.data.data.totalDebit,
          totalKredit: res.data.data.totalKredit,
          saldo: res.data.data.saldo,
        })
      );
    } catch (error) {
      dispatch(errorFetchingLaporan());
    }
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

export const setEndDate = (endDate) => {
  return {
    type: SET_END_DATE,
    endDate,
  };
};
export const setStartDate = (startDate) => {
  return {
    type: SET_START_DATE,
    startDate,
  };
};
