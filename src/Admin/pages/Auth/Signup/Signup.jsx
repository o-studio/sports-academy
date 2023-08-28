import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSignIn, useAuthUser } from "react-auth-kit";
import { Icon } from "@iconify/react";
import "./Signup.css";

const Signup = ({props}) => {
  const {Config, Imports} = props;
  const {Helpers} = Imports;
  const auth = useAuthUser();
  const signIn = useSignIn();
  const [showPass, setShowPass] = useState(false);
  const [Submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [login, setLogin] = useState(auth() && auth().token ? true : false);

  Helpers.Title(`${Config.AppName} | تسجيل حساب جديد`, true);

  useEffect(()=>{
    setTimeout(() => setLoginError(null), 5000);
  }, [loginError]);

  return (
    <section className="Signup-Page">
      <form onSubmit={(e)=>{
        e.preventDefault();
        setSubmitting(true);
        if (e.target.pass1.value != e.target.pass2.value) {
          setLoginError("كلمة السر غير متطابقة");
          setSubmitting(false);
          return;
        }
        fetch(`${Config.apiServer}/auth/register?lang=ar`, {
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
            signIn({
              token: res.result.token,
              expiresIn: 60 * 8,
              authState: { ...res.result }
            });
            setLogin(true);
          } else {
            setLoginError(res.result);
            setSubmitting(false);
          }
        })
        .catch(() => setLoginError("حدث خطاء ما. حاول مرة اخرى لاحقا من فضلك !"));
      }}>
        <p>
          <Link to="/">
            <Icon icon="mingcute:right-line" />
          </Link>
          <span>انضم الينا</span>
        </p>
        <h1>انشاء حساب جديد</h1>
        <p>قم بانشاء حساب جديد لتتمكن من فتح لوحة التحكم</p>
        {typeof loginError == "string" ? <p className="error">
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
        <button className="item" type="submit" onClick={()=>setShowPass(false)}>
          {Submitting ? <Icon icon="feather:loader" /> : <></>}
          انشاء حساب
        </button>
        <span>لديك حساب بالفعل ؟ <Link to="/dash/login">سجل الدخول</Link></span>
      </form>
      {login ? <Navigate to="/dash" replace={true} /> : <></>}
    </section>
  )
};
export default Signup;