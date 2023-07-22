import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./NotFound.css";

const NotFound = () => {
  Helpers.Title(`${Config.AppName} | الصفحة غير موجودة`);

  return (
    <Components.Layout>
      الصفحة غير موجودة
    </Components.Layout>
  )
};
export default NotFound;