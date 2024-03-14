import React, { useEffect } from 'react';
import Header from "./components/user/Header";
import Homepage from './components/user/Homepage';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/user/Footer';
import User from './components/user/User';
import AdminPage from './components/admin/AdminPage';
import ProductDetail from './components/user/ProductDetail';


function App() {

  const createCart = () => {
    const count = {
      quantity: "0"
    }
    window.localStorage.setItem("Cart", JSON.stringify(count));
  }

  if (window.localStorage.key(0) == null) {
    createCart();
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
