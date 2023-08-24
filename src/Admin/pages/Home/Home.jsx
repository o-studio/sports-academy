import { Link } from "react-router-dom";
import {useAuthUser} from 'react-auth-kit'
import { Icon } from "@iconify/react";
import "./Home.css";

const Home = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  const PageName = "الرئيسية";
  const PageData = Config.nav.find(item=> item.name == PageName)
  Helpers.Title(`${Config.AppName} | ${PageName}`, true);

  const auth = useAuthUser();

  return (
    <Components.AdminAccess>
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
                <Link to={item.link} className="side" style={{background: item.color}} key={index}>
                  <Icon className="side-logo" icon={item.icon} />
                  <hr />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </Components.Layout>
    </Components.AdminAccess>
  )
};
export default Home;