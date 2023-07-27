import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as Imports from "./Imports";
const { Pages, Helpers } = Imports;
import Config from "./Config.json";
import Admin from "./Admin/Admin";

window.themeManager = new Helpers.ThemeManager(Config);
window.themeManager.apply();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={Config.baseName} >
    <Helpers.AutoGoTop />
    <Routes>
      <Route path="/" element={<Pages.Home props={{Config, Imports}} />} />
      <Route path="/about" element={<Pages.About props={{Config, Imports}} />} />
      <Route path="/contact" element={<Pages.Contact props={{Config, Imports}} />} />
      <Route path="*" element={<Pages.Error404 props={{Config, Imports}} />} />
      <Route path="/dash/*" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
