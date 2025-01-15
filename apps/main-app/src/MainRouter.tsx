import { Route, Routes } from "react-router";
import App from "./App";
import MicroApp4Container from "./MicroApp4Container";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/microapp4" element={<MicroApp4Container />} />
      <Route path="/microapp4/*" element={<MicroApp4Container />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default MainRouter;
