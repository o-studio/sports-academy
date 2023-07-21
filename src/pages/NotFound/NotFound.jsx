import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./NotFound.css";

const NotFound = () => {
  Helpers.Title(`${Config.AppName} | NotFound`);

  return (
    <Components.Layout>
      NotFound Page
    </Components.Layout>
  )
};
export default NotFound;