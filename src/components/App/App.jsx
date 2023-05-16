import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader';
import AppStyle from './App.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/Reset-password';
import ForgotPassword from '../pages/Forgot-password';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

function App() {
  const [openModal, setOpenModal] = useState({ modalIngredient: false, modalOrder: false });

  return (
    // <div className={AppStyle.App}>
    //   <AppHeader />
    //   <main className={AppStyle.main}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    // </main>
    //   {openModal.modalIngredient && (
    //     <Modal onClose={() => setOpenModal({ modalIngredient: false })}>
    //       <IngredientDetails />
    //     </Modal>
    //   )}
    //   {openModal.modalOrder && (
    //     <Modal onClose={() => setOpenModal({ modalOrder: false })}>
    //       <OrderDetails />
    //     </Modal>
    //   )}
    // </div>
  );
}

export default App;
