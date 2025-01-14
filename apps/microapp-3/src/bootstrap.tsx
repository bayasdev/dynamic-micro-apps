import ReactDOM from "react-dom/client";
import App from "./App";

// Helper function to mount the app to a DOM element
export function mountTo(el: HTMLElement) {
  const root = ReactDOM.createRoot(el);
  root.render(<App />);
}
