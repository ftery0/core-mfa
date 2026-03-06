import { Outlet, useLocation } from 'react-router-dom';
import { DodamNavBar, ETheme, type Eigenvalues } from '@mfa/dds';
import { useTheme } from 'hooks/Theme/usetheme';
import useLogout from 'hooks/Auth/useLogout';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundNeutral};
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.backgroundNeutral};
`;

const getNavLocation = (pathname: string): Eigenvalues => {
  if (pathname.startsWith('/nightstudy')) return 'nightstudy';
  return 'home';
};

const AppLayout = () => {
  const { themeColor, handleTheme } = useTheme();
  const { logOut } = useLogout();
  const { pathname } = useLocation();

  return (
    <PageWrapper>
      <DodamNavBar
        location={getNavLocation(pathname)}
        currentTheme={themeColor as ETheme}
        handleTheme={handleTheme}
        logout={logOut}
      />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AppLayout;
