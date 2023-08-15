// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Error404 from "./pages/NotFound/NotFound";

// components
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// helpers
import Title from "./helpers/Title";
import AutoGoTop from "./helpers/AutoGoTop";
import toMatrix from "./helpers/toMatrix";
import UrlQuery from "./helpers/UrlQuery";
import ThemeManager from "./helpers/ThemeManager";


// var pages = import.meta.glob('./pages/*/*.jsx', { eager: true })
//   const routes = Object.keys(pages).map((path) => {
//     const name = path.match(/pages\/(.+)\/(.+)\.jsx$/)[1]
//     return {
//       name,
//       path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
//       component: pages[path].default,
//     }
//   })
//   console.log(routes)

// export all Pages
export const Pages = {
  Home, About, Contact, Error404
};

// export all Components
export const Components = {
  Layout, Header, Footer
};

// export all Helpers
export const Helpers = {
  Title, AutoGoTop, toMatrix, UrlQuery, ThemeManager
}