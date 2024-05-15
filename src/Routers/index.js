// AppRouter.js
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "../page/signin/index";
import GuardRoute from "../components/grubnav/index";
import GuestOnlyRoute from "../components/grubnav copy/index";
import NavBar from "../components/NavBar";
import { HomeRoute } from "./HomeRoute";
import { OrderRoute } from "./OrderRoute";
import { JadwalRoute } from "./JadwalRoute";
import { PenyewaRoute } from "./PenyewaRoute";
import { PaketRoute } from "./PekatRoute";
import { AdminRoute } from "./UserRoute";
import { PelangganRoute } from "./UserRoute";
import { PaymentRoute } from "./PaymentRoute";
import { LaporanRoute } from "./LaporanRoute";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <Signin />
          </GuestOnlyRoute>
        }
      />
      <Route
        path=""
        element={
          <>
            <NavBar />
            <GuardRoute />
          </>
        }
      >
        <Route path="dashboard/*" element={<HomeRoute />} />
        <Route path="order/*" element={<OrderRoute />} />
        <Route path="jadwal/*" element={<JadwalRoute />} />
        <Route path="penyewa/*" element={<PenyewaRoute />} />
        <Route path="paket/*" element={<PaketRoute />} />
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="pelanggan/*" element={<PelangganRoute />} />
        <Route path="payment/*" element={<PaymentRoute />} />
        <Route path="laporan/*" element={<LaporanRoute />} />
        <Route path="" element={<Navigate to="/dashboard" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
