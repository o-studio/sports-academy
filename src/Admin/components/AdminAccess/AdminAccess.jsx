import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router-dom";

const AdminAccess = ({ children, login }) => {
  // const authPages = ["/dash/login", "/dash/signup", "/dash/forgot"];
  // const [NeedLogin, setNeedLogin] = useState(true);
  // fetch(
  //   Config.apiServer + "/auth/status?token=" + localStorage.getItem("token")
  // )
  //   .then(res => res.json())
  //   .then(res => setNeedLogin(!res.ok))
  //   .catch(console.log);
  const HaveAccess = useIsAuthenticated();
  return HaveAccess() ? children : <Navigate to={login ? login : "/dash/login"} />;
};

export default AdminAccess;
