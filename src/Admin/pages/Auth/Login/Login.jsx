import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";
import { Icon } from "@iconify/react";
import "./Login.css";

const Login = ({props}) => {
  const {Config, Imports} = props;
  const {Helpers} = Imports;
  const auth = useAuthUser();
  const signIn = useSignIn();
  const [showPass, setShowPass] = useState(false);
  const [Submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [login, setLogin] = useState(auth() && auth().token ? true : false);
  
  Helpers.Title(`${Config.AppName} | تسجيل الدخول`, true);

  useEffect(()=>{
    setTimeout(() => setLoginError(null), 5000);
  }, [loginError]);

  return (
    <section className="Login-Page">
      <form onSubmit={(e)=>{
        e.preventDefault();
        setSubmitting(true);
        fetch(`${Config.apiServer}/auth/login?lang=ar`, {
          method: "POST",
          body: JSON.stringify({
            "email": e.target.email.value,
            "password": e.target.pass.value,
          })
        })
        .then(res=>res.json())
        .then(res=>{
          if(res.ok == true){
            signIn({
              token: res.result.token,
              expiresIn: 60 * 8,
              authState: { ...res.result }
            });
            localStorage.setItem("login", true);
            setLogin(true);
          } else {
            setLoginError(res.result);
            setSubmitting(false);
          }
        });
      }}>
        <p>
          <Link to="/">
            <Icon icon="mingcute:right-line" />
          </Link>
          <span>اهلا بالعودة</span>
        </p>
        <h1>تسجيل الدخول</h1>
        <p>قم بتسجيل الدخول لتتمكن من فتح لوحة التحكم</p>
        {loginError ? <p className="error">
          <Icon icon="feather:alert-triangle" />
          {loginError}
        </p> : <></>}
        <label className="item user-group">
          <Icon icon="majesticons:mail-line" />
          <input type="email" name="email" required placeholder="البريد الالكتروني" />
        </label>
        <label className="item pass-group">
          <Icon icon="mdi:password-outline" />
          <input type={`${showPass ? "text" : "password"}`} name="pass" required placeholder="كلمة المرور" />
          <Icon className="showPass" icon={`${showPass ? "akar-icons:eye-open" : "pepicons-pop:eye-closed"}`} onClick={()=>setShowPass(!showPass)} />
        </label>
        <Link to="/dash/forget-password">هل نسيت كلمة السر ؟</Link>
        <button className="item" type="submit" onClick={()=>setShowPass(false)}>
          {Submitting ? <Icon icon="feather:loader" /> : <></>}
          تسجيل الدخول
        </button>
        <span>ليس لديك حساب ؟ <Link to="/dash/signup">سجل الان</Link></span>
      </form>
      {login ? <Navigate to="/dash" replace={true} /> : <></>}
    </section>
  )
};
export default Login;