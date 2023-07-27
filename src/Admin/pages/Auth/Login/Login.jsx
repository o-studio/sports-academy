import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Login.css";

const Login = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  const [showPass, setShowPass] = useState(false);
  
  Helpers.Title(`${Config.AppName} | تسجيل الدخرل`);

  return (
    <section className="Login-Page">
      <form action="#">
        <p>
          <Icon icon="mingcute:right-line" onClick={()=> history.back()} />
          <span>اهلا بالعودة</span>
        </p>
        <h1>تسجيل الدخول</h1>
        <p>قم بتسجيل الدخول لتتمكن من فتح لوحة التحكم</p>
        <label className="item user-group">
          <Icon icon="majesticons:mail-line" />
          <input type="email" name="mail" required placeholder="البريد الالكتروني" />
        </label>
        <label className="item pass-group">
          <Icon icon="mdi:password-outline" />
          <input type={`${showPass ? "text" : "password"}`} name="pass" required placeholder="كلمة المرور" />
          <Icon className="showPass" icon={`${showPass ? "akar-icons:eye-open" : "pepicons-pop:eye-closed"}`} onClick={()=>setShowPass(!showPass)} />
        </label>
        <Link to="/dash/forget-password">هل نسيت كلمة السر ؟</Link>
        <button className="item" type="submit" onClick={()=>setShowPass(false)}>تسجيل الدخول</button>
        <span>ليس لديك حساب ؟ <Link to="/dash/signup">سجل الان</Link></span>
      </form>
    </section>
  )
};
export default Login;