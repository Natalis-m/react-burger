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
import { getUser, updateToken } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageIngredient from '../pages/PageIngredient/PageIngredient';
import { fetchIngredients } from '../../services/slices/getIngredientsSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isProfile = location.pathname === '/profile';
  const background = location.state && location.state.background;
  const arrivalPoint = location.state && location.state.arrivalPoint;

  let isToken = localStorage.getItem('token');
  let state = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchIngredients());

    if (isToken) {
      dispatch(updateToken());
    }

    if (isProfile && state.user) {
      const tokenEndDate = new Date(localStorage.getItem('tokenEndDate'));
      const newDate = new Date();
      const isTokenEnded = newDate.getTime() >= tokenEndDate.getTime();

      if (isTokenEnded && isToken) {
        dispatch(updateToken());
      }
    }
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
