import { DodamNotFoundPage } from "@mfa/dds";
import PageTemplate from "components/Common/PageTemplate";
import WakeupSongPage from "pages/page";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route index element={<WakeupSongPage />} />
      </Route>
      <Route path="*" element={<DodamNotFoundPage />} />
    </Routes>
  );
};

export default Router;
