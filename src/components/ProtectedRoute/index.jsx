import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isUserLoggedIn = useSelector(state => state.userReducer.accessToken);
  const location = useLocation();

  if (isUserLoggedIn) {
    return element;
  }

  return <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;
