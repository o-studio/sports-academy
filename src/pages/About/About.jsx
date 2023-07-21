import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./About.css";

const About = () => {
  Helpers.Title(`${Config.AppName} | About`);

  return (
    <Components.Layout>
      About Page
    </Components.Layout>
  )
};
export default About;