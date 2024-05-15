import { Route, Routes } from 'react-router-dom';

import Paket from '../page/paket/index';
import Create from '../page/paket/create';
import Edit from '../page/paket/edit';

export function PaketRoute() {
  return (
    <Routes>
      <Route path="/" element={<Paket />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:PaketId" element={<Edit />} />
    </Routes>
  );
}
