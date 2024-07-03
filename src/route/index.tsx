import { Home } from '@/pages';
import { useRoutes } from 'react-router-dom';
const Route = () => {
  return useRoutes([
    {
      path: '/chat',
      element: <Home />,
    },
  ]);
};
export default Route;
