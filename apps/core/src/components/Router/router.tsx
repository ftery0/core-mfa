import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from 'pages/Auth/authPage';
import AppLayout from 'components/Layout/AppLayout';
import ComingSoonPage from 'pages/ComingSoon/comingSoonPage';
import LoadingBar from 'components/Loading/LoadingBar';

const DodamOneApp = lazy(() => import('remotes/DodamOneApp'));
const NightstudyApp = lazy(() => import('remotes/NightstudyApp'));
const WakeupsongApp = lazy(() => import('remotes/WakeupsongApp'));

const CoreRouter = () => (
  <Routes>
    <Route path="/sign" element={<AuthPage />} />
    <Route element={<AppLayout />}>
      <Route
        path="/nightstudy/*"
        element={
          <Suspense fallback={<LoadingBar />}>
            <NightstudyApp />
          </Suspense>
        }
      />
      <Route
        path="/wakesong/*"
        element={
          <Suspense fallback={<LoadingBar />}>
            <WakeupsongApp />
          </Suspense>
        }
      />
      <Route path="/notice/*" element={<ComingSoonPage />} />
      <Route path="/schedule/*" element={<ComingSoonPage />} />
      <Route path="/club/*" element={<ComingSoonPage />} />
      <Route
        path="/*"
        element={
          <Suspense fallback={<LoadingBar />}>
            <DodamOneApp />
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default CoreRouter;
