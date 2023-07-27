import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Signup.css";

const Signup = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  const [showPass, setShowPass] = useState(false);

  Helpers.Title(`${Config.AppName} | تسجيل حساب جديد`);

  return (
    <section className="Signup-Page">
      <form action="#">
        <p>
          <Icon icon="mingcute:right-line" onClick={()=> history.back()} />
          <span>انضم الينا</span>
        </p>
        <h1>انشاء حساب جديد</h1>
        <p>قم بانشاء حساب جديد لتتمكن من فتح لوحة التحكم</p>
        <span className="item user-group">
          <Icon icon="majesticons:mail-line" />
          <input type="email" name="mail" required placeholder="البريد الالكتروني" />
        </span>
        <span className="item pass-group">
          <Icon icon="mdi:password-outline" />
          <input type={`${showPass ? "text" : "password"}`} name="pass1" required placeholder="كلمة المرور" />
          <Icon className="showPass" icon={`${showPass ? "akar-icons:eye-open" : "pepicons-pop:eye-closed"}`} onClick={()=>setShowPass(!showPass)} />
        </span>
        <span className="item pass-group">
          <Icon icon="mdi:password-outline" />
          <input type={`${showPass ? "text" : "password"}`} name="pass2" required placeholder="كرر كلمة المرور" />
          <Icon className="showPass" icon={`${showPass ? "akar-icons:eye-open" : "pepicons-pop:eye-closed"}`} onClick={()=>setShowPass(!showPass)} />
        </span>
        <button className="item" type="submit">انشاء حساب</button>
        <span>لديك حساب بالفعل ؟ <Link to="/dash/login">سجل الدخول</Link></span>
      </form>
    </section>
  )
};
export default Signup;