import { Outlet, useLocation } from 'react-router-dom';
import { DodamNavBar, ETheme, type Eigenvalues } from '@mfa/dds';
import { useTheme } from 'hooks/Theme/usetheme';
import useLogout from 'hooks/Auth/useLogout';

const getNavLocation = (pathname: string): Eigenvalues => {
  if (pathname.startsWith('/nightstudy')) return 'nightstudy';
  return 'home';
};

const AppLayout = () => {
  const { themeColor, handleTheme } = useTheme();
  const { logOut } = useLogout();
  const { pathname } = useLocation();

  return (
    <>
      <DodamNavBar
        location={getNavLocation(pathname)}
        currentTheme={themeColor as ETheme}
        handleTheme={handleTheme}
        logout={logOut}
      />
      <Outlet />
    </>
  );
};

export default AppLayout;
