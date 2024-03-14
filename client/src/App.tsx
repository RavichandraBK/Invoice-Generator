import LoginPage from './Pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import React from 'react';

function App(): JSX.Element {
  return (
    <> 
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;
