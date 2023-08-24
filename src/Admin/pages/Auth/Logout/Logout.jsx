import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";

const Logout = ({ props }) => {
  const { Config, Imports } = props;
  const { Helpers } = Imports;
  Helpers.Title(`${Config.AppName} | تسجيل الخروج`, true);

  const [ Logout, setLogout ] = useState(false);
  const signOut = useSignOut();
  const auth = useAuthUser();

  var url = new URL(Config.apiServer + "/auth/logout");
  url.searchParams.set("token", auth() && auth().token ? auth().token : null);
  fetch(url.href, { method: "post" })
    .then(res => res.text())
    .then(res => {
      console.log(res);
      signOut();
      setLogout(true);
    })
    .catch(console.error);
  return Logout ? <Navigate to="/" /> : <></>;
};

export default Logout;
