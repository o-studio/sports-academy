import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./Signup.css";

const Signup = ({props}) => {
  const {Config, Imports} = props;
  const {Components, Helpers} = Imports;
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [login, setLogin] = useState(localStorage.getItem('login') || null);

  Helpers.Title(`${Config.AppName} | تسجيل حساب جديد`, true);

  useEffect(()=>{
    setTimeout(() => setLoginError(null), 5000);
  }, [loginError]);


  return (
    <section className="Signup-Page">
      <form onSubmit={(e)=>{
        e.preventDefault();
        if (e.target.pass1.value != e.target.pass2.value) {
          setLoginError("كلمة السر غير متطابقة");
          return;
        }
        fetch(`${Config.apiServer}/auth/register`, {
          method: "POST",
          body: JSON.stringify({
            "name": e.target.name.value,
            "email": e.target.email.value,
            "password": e.target.pass1.value,
          })
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.ok == true){
            localStorage.setItem("user", JSON.stringify(res.result));
            localStorage.setItem("token", res.result.token);
            setLogin(true);
          } else {
            setLoginError("حدث خطاء ما. حاول مرة اخرى لاحقا من فضلك !");
          }
        });
      }}>
        <p>
        <Link to="/">
            <Icon icon="mingcute:right-line" />
          </Link>
          <span>انضم الينا</span>
        </p>
        <h1>انشاء حساب جديد</h1>
        <p>قم بانشاء حساب جديد لتتمكن من فتح لوحة التحكم</p>
        {loginError ? <p className="error">
          <Icon icon="feather:alert-triangle" />
          {loginError}
        </p> : <></>}
        <span className="item user-group">
          <Icon icon="fluent-mdl2:rename" />
          <input type="text" name="name" required placeholder="الاسم الكامل" />
        </span>
        <span className="item user-group">
          <Icon icon="majesticons:mail-line" />
          <input type="email" name="email" required placeholder="البريد الالكتروني" />
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