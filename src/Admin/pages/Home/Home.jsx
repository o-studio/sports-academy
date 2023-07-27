import { Icon } from "@iconify/react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  const PageName = "الرئيسية";
  const PageData = Config.nav.find(item=> item.name == PageName)
  Helpers.Title(`${Config.AppName} | ${PageName}`);

  return (
    <Components.Layout  header={Config.nav} >
      <section className="Home-Page">
        <div className="home-header">
          <h1 className="home-logo">
            <Icon style={{color: PageData.color}} icon={PageData.icon} />
            <span>{` ${PageName}`}</span>
          </h1>
          <div className="home-banner">

          </div>
        </div>
        <div className="home-sides">
          {Config.nav.map((item, index) => {
            return item.name == PageName ? "" : (
              <Link to={item.link} className="side" key={index}>
                <Icon className="side-logo" style={{color: item.color}} icon={item.icon} />
                <hr />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </Components.Layout>
  )
};
export default Home;