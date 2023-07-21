import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Config from "../../Config.json";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link className="item logo" to="/">
        <img src="/assets/images/logo.svg" />
        <span>{Config.AppName}</span>
      </Link>
      <nav className="links">
        <Link className="item" to="/">
          <Icon icon="fa:home" />
          <span>Home</span>
        </Link>
        <Link className="item" to="/contact">
          <Icon icon="fa:envelope" />
          <span>Contact</span>
        </Link>
        <Link className="item" to="/about">
          <Icon icon="fa:info-circle" />
          <span>About</span>
        </Link>
      </nav>
      <nav>
        <Link className="item" to="/auth/login">
          <span>Login</span>
        </Link>
        <Link className="item" to="/auth/signup">
          <span>Sign Up</span>
        </Link>
        <Icon className="item" icon="fa:moon-o" onClick={()=> window.themeManager.switch()} />
      </nav>
    </header>
  );
};
export default Header;
