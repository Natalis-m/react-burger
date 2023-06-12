import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const isUserLoaded = useSelector(state => state.userReducer.user.name);

  console.log('isUserLoaded', isUserLoaded);
  return isUserLoaded ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
