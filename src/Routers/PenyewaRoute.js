import { Route, Routes } from 'react-router-dom';

import Penyewa from '../page/penyewa/Index';
import Create from '../page/penyewa/create';
import Edit from '../page/penyewa/edit';

export function PenyewaRoute() {
  return (
    <Routes>
    <Route path="/" element={<Penyewa />} />
    <Route path='/create' element={<Create />} />
    <Route path='/edit/:PenyewaId' element={<Edit/>} />
    </Routes>
  );
}
