import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

function ProtectedRoute({ element }) {
  const isUserLoggedIn = useTypedSelector(state => state.userReducer.accessToken);
  const location = useLocation();

  if (isUserLoggedIn) {
    return element;
  }

  return <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;
