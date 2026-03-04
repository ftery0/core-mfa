import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from 'pages/Auth/authPage';
import AppLayout from 'components/Layout/AppLayout';

const DodamOneApp = lazy(() => import('remotes/DodamOneApp'));
const NightstudyApp = lazy(() => import('remotes/NightstudyApp'));

const CoreRouter = () => (
  <Routes>
    <Route path="/sign" element={<AuthPage />} />
    <Route element={<AppLayout />}>
      <Route
        path="/nightstudy/*"
        element={
          <Suspense fallback={null}>
            <NightstudyApp />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={null}>
            <DodamOneApp />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default CoreRouter;
