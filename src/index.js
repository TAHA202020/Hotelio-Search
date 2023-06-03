import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './Search/Search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <Routes>
      <Route  path='/search' element={<Search />}/> 
    </Routes>
  </BrowserRouter>
);

