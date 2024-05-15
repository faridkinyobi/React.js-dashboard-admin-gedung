import { Route, Routes } from "react-router-dom";

import Order from "../page/order";
import Bukti from "../page/order/index Bukti";

export function OrderRoute() {
  return (
    <Routes>
      <Route path="/" element={<Order />} />
      <Route path="/bukti/:id" element={<Bukti />} />
    </Routes>
  );
}
