import LoginPage from './Pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import React, { useState } from 'react';
import AddProductsPage from './Pages/AddProductsPage';
import { myContext } from './Contexts/myContext';
import { uid } from 'uid';
import InvoicePdf from './Components/InvoicePdf';

interface Item {
  id: string;
  prodName: string;
  qty: number;
  rate: string;
  total: number;
}

function App(): JSX.Element {
  const [items, setItems] = useState<Item[]>([
    {
      id: uid(6),
      prodName: '',
      qty: 1,
      rate: '1.00',
      total: 0,
    },
  ]);

  return (
    <>
        <myContext.Provider value={{ items, setItems }}>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/AddProduct" element={<AddProductsPage />} />
          <Route path="/Gen-Pdf" element={<InvoicePdf />} />
      </Routes>
        </myContext.Provider>
    </>
  );
}

export default App;
