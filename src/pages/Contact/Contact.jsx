import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./Contact.css";

const Contact = () => {
  Helpers.Title(`${Config.AppName} | اتصل بنا`);

  return (
    <Components.Layout>
      صفحة اتصل بنا
    </Components.Layout>
  )
};
export default Contact;