import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import { Pages, Helpers } from "./Imports";
import Config from "./Config.json";
import "./App.css";

window.themeManager = new Helpers.ThemeManager(Config);
window.themeManager.apply();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Helpers.AutoGoTop />
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/about" element={<Pages.About />} />
      <Route path="/contact" element={<Pages.Contact />} />
      <Route path="/NotFound" element={<Pages.Error404 />} />
      <Route path="*" element={<Navigate to="/NotFound" />} />
    </Routes>
  </BrowserRouter>
);
