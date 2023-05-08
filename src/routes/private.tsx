import { Outlet } from "react-router-dom";
import { AuthPage } from "../pages/auth-page/auth-page";
import useToken from "../hooks/usetoken.hook";

const Private = (): JSX.Element => {
  const [token] = useToken();

  if (!token) {
    window.location.href = "/login";
    return <AuthPage />;
  } else {
    return <Outlet />;
  }
};

export default Private;
