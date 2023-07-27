import {Components, Helpers} from "../../Imports";
import "./Layout.css";

const Layout = ({children, header, noHeader}) => {
  Helpers.Title("Sport Academy | Layout")

  return (
    <>
      {noHeader ? <></> : <Components.Header List={header} />}
      <section className="content">
        {children}
        <Components.Footer />
      </section>
    </>
  )
};
export default Layout;