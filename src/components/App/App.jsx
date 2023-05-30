import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/Reset-password';
import ForgotPassword from '../pages/Forgot-password';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProtectedRoute from '../ProtectedRoute';
import { getUser, updateToken } from '../../services/setUser/profile';
import { useDispatch } from 'react-redux';
import PageIngredient from '../pages/PageIngredient/PageIngredient';
import { fetchIngredients } from '../../services/slices/getIngredientsSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isProfile = location.pathname === '/profile';

  if (isProfile) {
    const tokenEndDate = new Date(localStorage.getItem('tokenEndDate'));
    const newDate = new Date();
    const isTokenEnded = newDate.getTime() >= tokenEndDate.getTime();

    if (isTokenEnded) {
      updateToken();
      getUser();
    } else {
      getUser();
    }
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile/*" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="ingredients/:id" element={<PageIngredient />} />
        {/* /ingredients/643d69a5c3f7b9001cfa093d */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
