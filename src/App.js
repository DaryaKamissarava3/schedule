import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import Layout from './Layout';
import { Main } from './pages/Main';


export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />}/></Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}
