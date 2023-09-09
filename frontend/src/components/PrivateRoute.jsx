import { Route, Navigate } from 'react-router-dom';

export default function PrivateRoute({ element, authenticated, fallbackPath }) {
  return authenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={fallbackPath} replace />
  );
}
