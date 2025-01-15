import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import MainRouter from "./MainRouter";

// Helper function to mount the app to a DOM element
export function mountTo(el: HTMLElement, basePath?: string) {
  const root = ReactDOM.createRoot(el);
  root.render(
    <BrowserRouter basename={basePath}>
      <MainRouter isEmbedded />
    </BrowserRouter>
  );
}
