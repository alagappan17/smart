import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, axios } from '../query';

const environment = {
  api: {
    url: 'http://localhost:6500',
  },
};

axios.initialize(environment);

const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient.client}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default AppProviders;
