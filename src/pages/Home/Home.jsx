import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./Home.css";

const Home = () => {
  Helpers.Title(`${Config.AppName} | Home`);

  return (
    <Components.Layout>
      Home Page
    </Components.Layout>
  )
};
export default Home;