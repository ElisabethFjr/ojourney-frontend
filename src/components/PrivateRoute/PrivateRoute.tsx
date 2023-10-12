import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import './PrivateRoute.scss';

interface PrivateRouteProps {
  children: React.ReactElement | null;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isConnected = useAppSelector((state) => state.user.isConnected);

  if (!isConnected) {
    return (
      <Navigate
        to="/signin-signup"
        replace
        aria-label="Redirection vers la page de connexion ou d'inscription"
      />
    );
  }

  return children;
}

export default PrivateRoute;
