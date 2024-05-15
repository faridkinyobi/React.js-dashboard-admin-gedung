import { Route, Routes } from 'react-router-dom';

import Laporan from "../page/laporan/index"

export function LaporanRoute() {
  return (
    <Routes>
      <Route path='/' element={<Laporan />} />
    </Routes>
  );
}
