import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isUserLoaded = localStorage.getItem('user');

  return isUserLoaded ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
