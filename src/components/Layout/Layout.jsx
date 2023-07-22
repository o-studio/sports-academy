import {Components, Helpers} from "../../Imports";
import "./Layout.css";

const Layout = ({children}) => {
  Helpers.Title("Sport Academy | Layout")

  return (
    <>
      <Components.Header />
      <section className="content">
        {children}
        <Components.Footer />
      </section>
    </>
  )
};
export default Layout;