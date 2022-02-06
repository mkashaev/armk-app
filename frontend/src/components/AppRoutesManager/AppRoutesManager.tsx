import { useRoutes } from 'react-router-dom';
import { getAppRoutes } from 'appRoutes';
import { useAuth } from 'hooks/useAuth';

const AppRoutesManager = () => {
  const { user } = useAuth();
  const routes = useRoutes(getAppRoutes(!!user?.token));

  return <>{routes}</>;
};

export default AppRoutesManager;
