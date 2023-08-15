import { Routes, Route } from "react-router-dom";

import * as Imports from "./Imports";
import Config from "./Config.json";
const { Pages, Helpers } = Imports;

const Admin = () => {
  fetch(Config.apiServer + "/auth/status?token=ddddddddddddddddf")
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)
  return (
    <Routes>
      <Route path="/" element={<Pages.Home props={{Config, Imports}} />} />
      <Route path="/players" element={<Pages.Players props={{Config, Imports}} />} />
      <Route path="/reports" element={<Pages.Reports props={{Config, Imports}} />} />
      <Route path="/salaries" element={<Pages.Salaries props={{Config, Imports}} />} />
      <Route path="/sports" element={<Pages.Sports props={{Config, Imports}} />} />
      <Route path="/subscriptions" element={<Pages.Subscriptions props={{Config, Imports}} />} />
      <Route path="/login" element={<Pages.Login props={{Config, Imports}} />} />
      <Route path="/logout" element={<Pages.Logout props={{Config, Imports}} />} />
      <Route path="/signup" element={<Pages.Signup props={{Config, Imports}} />} />
      <Route path="*" element={<Pages.Error404 props={{Config, Imports}} />} />
    </Routes>
  )
};

export default Admin;