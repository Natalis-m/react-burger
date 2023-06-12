import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  let isToken = localStorage.getItem('token');

  return isToken ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
