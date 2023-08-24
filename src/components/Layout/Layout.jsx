import { Components } from "../../Imports";
import "./Layout.css";

const Layout = ({ children, header, noHeader }) => {
  return (
    <>
      {noHeader ? <></> : <Components.Header List={header} />}
      <section className="content">
        {children}
        <Components.Footer />
      </section>
    </>
  );
};
export default Layout;
