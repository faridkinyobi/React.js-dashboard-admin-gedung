import { Route, Routes } from "react-router-dom";

import Payment from "../page/payment/Index";
import Create from "../page/payment/create";
import Edit from "../page/payment/edit";

export function PaymentRoute() {
  return (
    <Routes>
      <Route path="/" element={<Payment />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:PaymentId" element={<Edit />} />
    </Routes>
  );
}
