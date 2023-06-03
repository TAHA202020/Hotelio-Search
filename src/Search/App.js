import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import Search from './Search';

function App(){
  return(<Routes>
      <Route path="/search" element={<Search />} />
    </Routes>);

  
}

export default App;


