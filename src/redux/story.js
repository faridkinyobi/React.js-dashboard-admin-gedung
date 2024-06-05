import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";
import authReducer from "./auth/reducer.js";
import OrderPendingReducer from "./orderPending/reducer.js";
import OrderReducer from "./order/reducer.js";
import JadwalReducer from "./jadwal/reducer.js";
import PenyewaReducer from "./penyewa/reducer.js";
import PaketReducer from "./paket/reducer.js";
import PaymentReducer from "./payment/reducer.js";
import UserReducer from "./user/reducer.js";
import LaporanReducer from "./Laporan/reducer.js";
import CardReducer from "./totalPenyewa/reducer.js";
import BuktiReducer from "./bukti/reducer.js";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  OrderPending: OrderPendingReducer,
  Order: OrderReducer,
  Jadwal: JadwalReducer,
  Penyewa: PenyewaReducer,
  Paket: PaketReducer,
  Payment: PaymentReducer,
  User: UserReducer,
  Card: CardReducer,
  Laporan: LaporanReducer,
  Bukti: BuktiReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
