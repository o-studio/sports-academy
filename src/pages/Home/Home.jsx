import {Components, Helpers} from "../../Imports";
import Config from "../../Config.json";
import "./Home.css";

const Home = () => {
  Helpers.Title(`${Config.AppName} | الرئيسية`);

  return (
    <Components.Layout>
      <p style={{height: "120%"}}>الصفحة الرئيسية</p>

    </Components.Layout>
  )
};
export default Home;