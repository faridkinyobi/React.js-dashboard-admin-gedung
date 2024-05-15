import { Route, Routes } from 'react-router-dom';

import Dashboard from '../page/dashboard/index';

export function HomeRoute() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
    </Routes>
  );
}
