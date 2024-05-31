import { Route, Routes } from 'react-router-dom';

import Laporan from "../page/laporan/index"
import Create from "../page/laporan/create"

export function LaporanRoute() {
  return (
    <Routes>
      <Route path='/' element={<Laporan />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  );
}
