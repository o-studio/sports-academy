import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Sports.css";

const Sports = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;
  const PageName = "الانشطة";
  const PageData = Config.nav.find(item => item.name == PageName);
  Helpers.Title(`${Config.AppName} | ${PageName}`);

  const [SportsData, setSportsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(Helpers.UrlQuery("p") || 1);
  const perPage = 2;

  const API = new Helpers.APIServer("sports", "sport");

  useEffect(() => {
    API.getAll(currentPage, perPage, (data) => setSportsData(data));
  }, [currentPage]);

  const [name, setName] = useState("");
  return (
    <Components.Layout header={Config.nav}>
      <section className="Sports-Page">
        <div className="sports-header">
          <h1 className="sports-logo">
            <Icon style={{ color: PageData.color }} icon={PageData.icon} />
            <span>{` ${PageName}`}</span>
          </h1>
        </div>
        <div className="sports-sides">
          <form action="#" onSubmit={() => API.insert(JSON.stringify({name, content: name}), console.log)}>
            <label className="item box-group">
              <Icon icon="fluent-mdl2:rename" />
              <input type="text" value={name} onChange={(e)=> setName(e.target.value)} required placeholder="اسم النشاط" />
            </label>
            <button className="item" type="submit">اضافة</button>
          </form>
          <hr style={{margin: "10px 0"}}/>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>اسم النشاط</td>
                  <td>تاريخ الانشاء</td>
                  <td>تفاعل</td>
                </tr>
              </thead>
              <tbody>
                {SportsData ? SportsData.items.map((sport) => {
                  return (
                    <tr key={sport.name}>
                      <td><input type="checkbox" name={sport.name} id="" /></td>
                      <td>{sport.content}</td>
                      <td dir="ltr">{Helpers.cDate(sport.modified, "full")}</td>
                      <td dir="ltr">
                        <Icon icon="mdi:garbage-can-outline" style={{color: "#ff0000"}} onClick={()=> {
                          API.delete(sport.name, console.log);
                          setSportsData(null);
                        }} />
                        <Icon icon="mingcute:edit-line" style={{color: "#0099ff"}} />
                      </td>
                    </tr>
                  );
                }) : (<tr style={{gridTemplateColumns: "1fr"}}><td colSpan={4}>جار التحميل...</td></tr>)}
              </tbody>
              <tfoot>
                <tr style={{gridTemplateColumns: "1fr"}}>
                  <td colSpan="4">
                    {SportsData ? <>
                      <Components.HiPager
                        amount={SportsData["total-items"]}
                        onPageChange={(page) => {
                          setSportsData(null);
                          // Helpers.UrlQuery("p", page, true);
                          setCurrentPage(page);
                        }}
                        options={{
                          defaultPage: currentPage,
                          perPage: perPage,
                          buttonsToShow: 3
                        }}
                      />
                    </> : <></>}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </Components.Layout>
  );
};
export default Sports;
