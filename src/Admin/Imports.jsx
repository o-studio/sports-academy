import * as AppImports from "../Imports";

// pages
import Home from "./pages/Home/Home";
import Players from "./pages/Players/Players";
import Reports from "./pages/Reports/Reports";
import Salaries from "./pages/Salaries/Salaries";
import Sports from "./pages/Sports/Sports";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Error404 from "./pages/NotFound/NotFound";

// helpers
import cDate from "./helpers/cDate";

// export all Pages
export const Pages = {
  Home, Players, Reports, Salaries, Sports, Subscriptions, Login, Signup, Error404
};

// export all Components
export const Components = Object.assign({

}, AppImports.Components);

// export all Helpers
export const Helpers = Object.assign({
  cDate
}, AppImports.Helpers);