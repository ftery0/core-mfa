import { PageTemplateContainer } from "./style";
import { Outlet } from "react-router-dom";

const PageTemplate = () => {
  return (
    <PageTemplateContainer>
      <Outlet />
    </PageTemplateContainer>
  );
};

export default PageTemplate;
