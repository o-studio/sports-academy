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
  const [selectedRows, setSelectedRows] = useState([]);
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
                  setSportsData(null);
                  setDataNeedUpdate(DataNeedUpdate * 2);
                  setEditing(false);
                  setName("");
                });
              } else {
                API.insert(JSON.stringify({"name": Helpers.RandStr(), "content": name}), ()=>{
                  setSportsData(null);
                  setDataNeedUpdate(DataNeedUpdate * 2);
                  setName("");
                });
              }
            }}>
              <label className="item box-group">
                <Icon icon="fluent-mdl2:rename" />
                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} required placeholder="اسم النشاط" />
              </label>
              <div className="buttons" style={{display: "grid", gridTemplateColumns: Editing ? "1fr 100px" : "1fr", gap: "10px"}}>
                <button className="item" type="submit">{Editing ? "تحديث" : "اضافة"}</button>
                {Editing ? <button className="item" type="submit" onClick={()=> {
                  setEditing(false);
                  setName("");
                }}>الغاء</button> : <></>}
              </div>
            </form>
            <hr style={{margin: "10px 0"}}/>
            <div style={{display: "grid", gridTemplateColumns: selectedRows.length > 0 ? "1fr 60px" : "1fr", gap: "10px"}}>
              <form style={{display: "grid", gridTemplateColumns: "1fr 100px", gap: "10px"}} >
                <label className="item box-group">
                  <Icon icon="fluent-mdl2:search" />
                  <input type="text" placeholder="بحث" />
                </label>
                <button className="item" type="submit">بحث</button>
              </form>
              {selectedRows.length > 0 ? <button className="item" type="submit" style={{lineHeight: "100%"}}>
                <Icon icon="fluent-mdl2:delete" />
              </button> : null}
              
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <td>
                      <input
                        type="checkbox" 
                        checked={selectedRows.length === SportsData?.items.length} 
                        onChange={() => {
                          if (selectedRows.length === SportsData?.items.length) {
                            setSelectedRows([]);
                          } else {
                            setSelectedRows(SportsData.items.map(row => row.name));
                          }
                        }} 
                      />
                    </td>
                    <td>اسم النشاط</td>
                    <td>تاريخ الانشاء</td>
                    <td>تفاعل</td>
                  </tr>
                </thead>
                <tbody>
                  {SportsData ? SportsData.items.map((sport) => {
                    return (
                      <tr key={sport.name}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(sport.name)}
                            onChange={() => {
                              if (selectedRows.includes(sport.name)) {
                                setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== sport.name));
                              } else {
                                setSelectedRows([...selectedRows, sport.name]);
                              }
                            }} 
                          />
                        </td>
                        <td>{sport.content}</td>
                        <td dir="ltr">{Helpers.cDate(sport.modified, "full")}</td>
                        <td dir="ltr">
                          <Icon icon="mdi:garbage-can-outline" style={{color: "#ff0000"}} onClick={() => {
                            if(confirm(`هل انت متأكد من حذف ${sport.content} ؟`)) {
                              API.delete(sport.name, () => setSportsData(null));
                              setDataNeedUpdate(DataNeedUpdate * 2);
                            }
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
