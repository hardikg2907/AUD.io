import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function PrivateRoute({ path, element, fallbackPath }) {

  const {user} = useAuthContext()

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={fallbackPath} replace />
  );
}
