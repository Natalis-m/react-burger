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
import { forgotPassword, updateToken } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageIngredient from '../pages/PageIngredient/PageIngredient';
import { fetchIngredients } from '../../services/slices/getIngredientsSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const arrivalPoint = location.state === 'forgotPassword';

  const isRefreshToken = localStorage.getItem('refreshToken');
  const state = useSelector(state => state.userReducer);

  const accessTokenEndDate = new Date(localStorage.getItem('accessTokenEndDate'));
  const newDate = new Date();
  const isAccessTokenExpires = newDate.getTime() >= accessTokenEndDate.getTime();

  if (isRefreshToken && (isAccessTokenExpires || !state.accessToken)) {
    dispatch(updateToken());
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={arrivalPoint ? <ResetPassword /> : <NotFound />} />
        <Route path="profile/*" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="ingredients/:id" element={background ? <Home /> : <PageIngredient />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
