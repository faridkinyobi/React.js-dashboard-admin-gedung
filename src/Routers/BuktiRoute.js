import { Route, Routes } from "react-router-dom";

import Bukti from "../page/bukti/Index";
import Create from "../page/bukti/create";
import Edit from "../page/bukti/edit";

export function BuktiRoute() {
  return (
    <Routes>
      <Route path="/" element={<Bukti />} />
      <Route path="/create/:id" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}
