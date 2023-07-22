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

const Header = () => {
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
              <Icon icon={`icon-park-outline:menu-${toggleWide > 0 ? "fold" : "unfold"}`} />
            </span>
          ) : (
            <span className="item" onClick={()=> {setToggle(toggle * -1); window.sessionStorage.toggle = (toggle * -1);}} >
              <Icon icon={`${toggle > 0 ? "tabler:x" : "charm:menu-hamburger"}`} />
            </span>
          )
        }
      </nav>
      <nav className="links">
        <Link className="item" onClick={()=> hideHeader()} to="/">
          <Icon style={{color: "#3E8FEE"}} icon="fa:home" />
          <span>الرئيسية</span>
        </Link>
        <Link className="item" onClick={()=> hideHeader()} to="/contact">
          <Icon style={{color: "#3EDA77"}} icon="fa:envelope" />
          <span>اتصل بنا</span>
        </Link>
        <Link className="item" onClick={()=> hideHeader()} to="/about">
          <Icon style={{color: "#D54B10"}} icon="fa:info-circle" />
          <span>من نحن</span>
        </Link>
      </nav>
      <nav>
        <Link className="item" onClick={()=> hideHeader()} to="/auth/login">
          <Icon icon="mdi:login-variant" />
          <span>تسجيل الدخول</span>
        </Link>
        <span className="item" onClick={()=> window.themeManager.switch()} >
          <Icon icon="fa:moon-o" />
          <span>المظهر</span>
        </span>
      </nav>
    </header>
  );
};
export default Header;
