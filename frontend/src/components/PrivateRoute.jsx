import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { authUser } = useSelector(store => store.user);
  return authUser ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
