import {Components, Helpers} from "../../Imports";
import "./Layout.css";

const Layout = ({children}) => {
  Helpers.Title("Sport Academy | Layout")

  return (
    <>
      <Components.Header />
      {children}
      <Components.Footer />
    </>
  )
};
export default Layout;