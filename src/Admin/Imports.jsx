import * as AppImports from "../Imports";

// pages
import Home from "./pages/Home/Home";
import Players from "./pages/Players/Players";
import Reports from "./pages/Reports/Reports";
import Salaries from "./pages/Salaries/Salaries";
import Sports from "./pages/Sports/Sports";
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import Login from "./pages/Auth/Login/Login";
import Logout from "./pages/Auth/Logout/Logout";
import Signup from "./pages/Auth/Signup/Signup";
import Error404 from "./pages/NotFound/NotFound";

// helpers
import cDate from "./helpers/cDate";
import APIServer from "./helpers/APIServer";
import RandStr from "./helpers/RandStr";

// components
import Tabler from "./components/Tabler/Tabler";
import HiPager from "./components/HiPager/HiPager";

// export all Pages
export const Pages = {
  Home, Players, Reports, Salaries, Sports, Subscriptions, Login, Logout, Signup, Error404
};

// export all Components
export const Components = Object.assign({
  Tabler, HiPager
}, AppImports.Components);

// export all Helpers
export const Helpers = Object.assign({
  cDate, APIServer, RandStr
}, AppImports.Helpers);