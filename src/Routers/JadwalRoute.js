import { Route, Routes } from "react-router-dom";

import Jadwal from "../page/jadwal/Index";
import Create from "../page/jadwal/create";
import Edit from "../page/jadwal/edit";

export function JadwalRoute() {
  return (
    <Routes>
      <Route path="/" element={<Jadwal />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:jadwalId' element={<Edit />} />
    </Routes>
  );
}
