import { Route, Routes } from "react-router";
import App from "./App";
import Settings from "./Settings";

interface MainRouterProps {
  isEmbedded?: boolean;
}

const MainRouter: React.FC<MainRouterProps> = ({ isEmbedded = false }) => {
  return (
    <Routes>
      <Route path="/" element={<App isEmbedded={isEmbedded} />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<h1>Not Found</h1>} />
      {/* <Route path="*" element={<App isEmbedded={isEmbedded} />} /> */}
    </Routes>
  );
};

export default MainRouter;
