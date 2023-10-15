import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/signin-signup" replace />;
  }

  return children;
}

export default PrivateRoute;
