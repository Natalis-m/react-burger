import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTyped';

interface protectedRouteProps {
  element: JSX.Element;
}

function ProtectedRoute({ element }: protectedRouteProps) {
  const isUserLoggedIn = useTypedSelector(state => state.userReducer.accessToken);
  const location = useLocation();

  if (isUserLoggedIn) {
    return element;
  }

  return <Navigate to="/login" state={{ from: location }} />;
}

export default ProtectedRoute;
