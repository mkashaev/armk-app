import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import AppLayout from 'components/AppLayout';
import Registry from 'pages/Registry';
import Record from 'pages/Record';
import CreateRecord from 'pages/CreateRecord';

export const getAppRoutes = (isAuth: boolean): RouteObject[] => [
  {
    path: '/',
    element: isAuth ? <AppLayout /> : <Navigate to="/login" />,
    children: [
      { index: true, element: <Registry /> },
      { path: '/registry/edit/:id', element: <CreateRecord /> },
      { path: '/registry/create', element: <CreateRecord /> },
      { path: '/registry/:id', element: <Record /> },
      { path: '/registry', element: <Registry /> },

      { path: '*', element: <Navigate to="/" /> },
    ],
  },
  {
    path: '/login',
    element: isAuth ? <Navigate to="/" /> : <Login />,
  },
];
