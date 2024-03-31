import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';

import Home from '../pages/Home';
import Layout from '../components/Layout';
import Blocks from '../pages/Blocks';
import Playground from '../pages/Playground';
import Results from '../pages/Results';
import MockPlayground from '../pages/MockPlayground';

const WrappedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WrappedLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/blocks" element={<Blocks />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/results" element={<Results />} />
      <Route path="/mock" element={<MockPlayground />} />
    </Route>
  )
);
