import { Route, Routes } from "react-router-dom";
import User from "../page/user/admin/index";
import Edit from "../page/user/admin/edit";
import Creat from "../page/user/admin/create";
// import Change from "../page/user/admin/change";
import Change from "../page/user/admin/change";
import Pelanggan from "../page/user/pelanggan/index";

export function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/edit/:Id" element={<Edit />} />
      <Route path="/create" element={<Creat />} />
      <Route path="/edit-password" element={<Change />} />
    </Routes>
  );
}
export function PelangganRoute() {
  return (
    <Routes>
      <Route path="/" element={<Pelanggan />} />
      <Route path="/edit" element={<Pelanggan />} />
    </Routes>
  );
}
