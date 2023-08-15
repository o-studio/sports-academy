import { Navigate } from "react-router-dom";

const Logout = ({ props }) => {
  const { Config, Imports } = props;
  const { Helpers } = Imports;
  Helpers.Title(`${Config.AppName} | تسجيل الخروج`);
  fetch(Config.apiServer + "/auth/logout", {
    credentials: 'include',
    method: "post"
  })
  .catch(console.error);
  localStorage.removeItem("login");
  return <Navigate to="/" />;
};

export default Logout;
