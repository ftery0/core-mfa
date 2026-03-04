import { LayoutContainer, Layout } from "./style";
import { Outlet } from "react-router-dom";

const PageTemplate = () => {
  return (
    <LayoutContainer>
      <Layout>
        <Outlet />
      </Layout>
    </LayoutContainer>
  );
};

export default PageTemplate;
