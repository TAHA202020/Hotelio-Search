import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import Reserve from './Reserve';

function App(){
  return(<Routes>
      <Route path="/" element={<Reserve />} />
    </Routes>);

  
}

export default App;


