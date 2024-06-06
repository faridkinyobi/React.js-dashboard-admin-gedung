import {
  START_FETCHING_LAPORAN,
  SUCCESS_FETCHING_LAPORAN,
  ERROR_FETCHING_LAPORAN,
  SET_START_DATE,
  SET_END_DATE,
  SET_LIMIT,
  SET_PAGE,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  page: 1,
  limit: 10,
  pages: 1,
  startDate: new Date(),
  endDate: new Date(),
  status: statuslist.idle,
  totalDebit: 0,
  totalKredit: 0,
  saldo: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LAPORAN:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_LAPORAN:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_LAPORAN:
      return {
        ...state,
        status: statuslist.success,
        data: action.laporan,
        pages: action.pages,
        totalDebit: action.totalDebit,
        totalKredit: action.totalKredit,
        saldo:action.saldo,
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate,
      };

    default:
      return state;
  }
}
