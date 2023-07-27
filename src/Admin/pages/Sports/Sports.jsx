import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Sports.css";
import banner from "./banner.svg";

import SportsApi from "./Sports.json";

const Sports = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;
  const PageName = "الالعاب";
  const PageData = Config.nav.find(item => item.name == PageName);
  Helpers.Title(`${Config.AppName} | ${PageName}`);

  const [SportsData, setSportsData] = useState(null);

  useEffect(() => {
    setSportsData(SportsApi);
    // fetch(`${Config.apiServer}/sports`)
    //   .then(res => res.text())
    //   .then(res => setSportsData(res))
    //   .catch(console.log);
  }, [SportsData]);

  return (
    <Components.Layout header={Config.nav}>
      <section className="Sports-Page">
        <div className="sports-header">
          <h1 className="sports-logo">
            <Icon style={{ color: PageData.color }} icon={PageData.icon} />
            <span>{` ${PageName}`}</span>
          </h1>
          <div className="sports-banner">
            <img src={banner} alt="sports banner" />
          </div>
        </div>
        <div className="sports-sides">
          <form action="#">
            <label className="item box-group">
              <Icon icon="fluent-mdl2:rename" />
              <input type="text" name="name" required placeholder="اسم اللعبة" />
            </label>
            <button className="item" type="submit">اضافة</button>
          </form>
          <hr style={{margin: "10px 0"}}/>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>اسم اللعبة</td>
                  <td>تاريخ الانشاء</td>
                  <td>تفاعل</td>
                </tr>
              </thead>
              <tbody>
                {SportsData ? SportsData.map((sport)=>{
                  
                  return (
                    <tr key={sport.id}>
                      <td><input type="checkbox" name={sport.id} id="" /></td>
                      <td>{sport.sport_name}</td>
                      <td dir="ltr">{Helpers.cDate(sport.create_date, "full")}</td>
                      <td dir="ltr">
                        <Icon icon="mdi:garbage-can-outline" style={{color: "#ff0000"}} />
                        <Icon icon="mingcute:edit-line" style={{color: "#0099ff"}} />
                      </td>
                    </tr>
                  );
                }) : (<tr><td colSpan={5}>loadding...</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Components.Layout>
  );
};
export default Sports;
