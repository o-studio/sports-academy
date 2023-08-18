import { Navigate } from "react-router-dom";

const Logout = ({ props }) => {
  const { Config, Imports } = props;
  const { Helpers } = Imports;
  Helpers.Title(`${Config.AppName} | تسجيل الخروج`);
  fetch(Config.apiServer + "/auth/logout", {
    method: "post"
  })
  .catch(console.error);
  localStorage.removeItem("token");
  return <Navigate to="/" />;
};

export default Logout;
