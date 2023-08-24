import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Sports.css";

const Sports = ({ props }) => {
  const { Config, Imports } = props;
  const { Components, Helpers } = Imports;
  const PageName = "الانشطة";
  const PageData = Config.nav.find(item => item.name == PageName);
  Helpers.Title(`${Config.AppName} | ${PageName}`, true);

  const [name, setName] = useState("");
  const [EditingNme, setEditingName] = useState("");
  const [SportsData, setSportsData] = useState(null);
  const [Editing, setEditing] = useState(false);
  const [DataNeedUpdate, setDataNeedUpdate] = useState(1);
  const [currentPage, setCurrentPage] = useState(Helpers.UrlQuery("p") || 1);
  const perPage = 10;

  const API = new Helpers.APIServer("sports", "sport");

  useEffect(() => {
    API.getAll(currentPage, perPage, (data) => setSportsData(data));
  }, [currentPage, DataNeedUpdate]);

  return (
    <Components.AdminAccess>
      <Components.Layout header={Config.nav}>
        <section className="Sports-Page">
          <div className="sports-header">
            <h1 className="sports-logo">
              <Icon style={{ color: PageData.color }} icon={PageData.icon} />
              <span>{` ${PageName}`}</span>
            </h1>
          </div>
          <div className="sports-sides">
            <form action="#" onSubmit={(e) => {
              e.preventDefault();
              if(Editing) {
                API.update(EditingNme, JSON.stringify({"name": EditingNme, "content": name}), ()=>{
                  setDataNeedUpdate(DataNeedUpdate * 2);
                  setEditing(false);
                  setName("");
                });
              } else {
                API.insert(JSON.stringify({"name": Helpers.RandStr(), "content": name}), ()=>{
                  setDataNeedUpdate(DataNeedUpdate * 2);
                  setName("");
                });
              }
            }}>
              <label className="item box-group">
                <Icon icon="fluent-mdl2:rename" />
                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} required placeholder="اسم النشاط" />
              </label>
              <div className="buttons">
                <button className="item" type="submit">{Editing ? "تحديث" : "اضافة"}</button>
                {Editing ? <button className="item" type="reset" onClick={()=> {
                  setEditing(false);
                  setName("");
                }}>الغاء</button> : <></>}
              </div>
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
                          <Icon icon="mdi:garbage-can-outline" style={{color: "#ff0000"}} onClick={() => {
                            API.delete(sport.name, console.log);
                            setDataNeedUpdate(DataNeedUpdate * 2);
                          }} />
                          <Icon icon="mingcute:edit-line" style={{color: "#0099ff"}} onClick={() => {
                            setEditing(true);
                            setEditingName(sport.name);
                            setName(sport.content);
                          }} />
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
    </Components.AdminAccess>
  );
};
export default Sports;
