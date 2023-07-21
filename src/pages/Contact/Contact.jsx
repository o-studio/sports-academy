import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./Contact.css";

const Contact = () => {
  Helpers.Title(`${Config.AppName} | Contact`);

  return (
    <Components.Layout>
      Contact Page
    </Components.Layout>
  )
};
export default Contact;