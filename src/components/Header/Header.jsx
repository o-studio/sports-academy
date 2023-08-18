import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Config from "../../Config.json";
import "./Header.css";
import { useState } from "react";

setInterval(() => {
  let items = document.querySelectorAll("header > nav > .item");
  items.forEach(item => {
    if (window.location.pathname == item.getAttribute("href") && !item.classList.contains("logo")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}, 100);

const Header = ({ List }) => {
  const [toggle, setToggle] = useState(window.sessionStorage.toggle || -1);
  const [toggleWide, setToggleWide] = useState(window.sessionStorage.toggleWide || 1);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  window.onresize = () => setPageWidth(window.innerWidth);
  const hideHeader = ()=> {setToggle(-1); window.sessionStorage.toggle = (-1);}
  return (
    <header className={`${toggle > 0 ? "open" : "close"} ${toggleWide > 0 ? "open-wide" : "close-wide"}`}>
      <nav className="logo-nav">
        <Link className="item logo" onClick={()=> hideHeader()} to="/">
          <img src="/assets/images/logo.svg" />
          <span>{Config.AppName}</span>
        </Link>
        {
          pageWidth > 800 ? (
            <span className="item" onClick={()=> {setToggleWide(toggleWide * -1); window.sessionStorage.toggleWide = (toggleWide * -1);}} >
              <Icon icon={`icon-park-outline:menu-${toggleWide > 0 ? "unfold" : "fold"}`} />
            </span>
          ) : (
            <span className="item" onClick={()=> {setToggle(toggle * -1); window.sessionStorage.toggle = (toggle * -1);}} >
              <Icon icon={`${toggle > 0 ? "tabler:x" : "charm:menu-hamburger"}`} />
            </span>
          )
        }
      </nav>
      <nav className="links">
        {
          List.map((item, index) => (
            <Link className="item" onClick={()=> hideHeader()} to={item.link} key={index}>
              <Icon style={{color: item.color}} icon={item.icon} />
              <span>{item.name}</span>
            </Link>
          ))
        }
      </nav>
      <nav>
        {false && (
          <span className="item" onClick={()=> window.themeManager.switch()} >
            <Icon icon="fa:moon-o" />
            <span>المظهر</span>
          </span>
        )}
        {localStorage.getItem('token') ? (
          <Link className="item" onClick={()=> hideHeader()} to="/dash">
            <Icon icon="gala:settings" />
            <span>لوحة التحكم</span>
          </Link>
        ) : <></>}
        <Link className="item" onClick={()=> hideHeader()} to={localStorage.getItem('token') ? "/dash/logout" : "/dash/login"}>
          <Icon icon="mdi:login-variant" />
          <span>تسجيل {localStorage.getItem('token') ? "الخروج" : "الدخول"}</span>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
