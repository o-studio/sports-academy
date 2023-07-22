import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./About.css";

const About = () => {
  Helpers.Title(`${Config.AppName} | من نحن`);

  return (
    <Components.Layout>
      صفحة من نحن
    </Components.Layout>
  )
};
export default About;