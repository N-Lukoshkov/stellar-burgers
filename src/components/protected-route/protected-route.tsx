import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
  fallbackPath?: string;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
  fallbackPath
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  const targetPath =
    fallbackPath || (onlyUnAuth ? location.state?.from || '/' : '/login');

  if ((!onlyUnAuth && !isAuthChecked) || (onlyUnAuth && isAuthChecked)) {
    return <Navigate replace to={targetPath} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
