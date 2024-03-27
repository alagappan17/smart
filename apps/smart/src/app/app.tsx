import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastContainer, Bounce } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, axios } from '../query';
import theme from '../theme';
import { ThemeProvider } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';

const environment = {
  api: {
    url: 'http://localhost:6500',
  },
};

axios.initialize(environment);

const AppProviders = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient.client}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          toastStyle={{ backgroundColor: '#fff', color: '#000', border: '1px solid black' }}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
