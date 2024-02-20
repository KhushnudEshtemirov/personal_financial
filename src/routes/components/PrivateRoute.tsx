import { FC, ReactNode, useContext } from "react";
import { CreateAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { routesName } from "../../constants/routes";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

interface IProps {
  children: ReactNode;
}

const PrivateRoute: FC<IProps> = ({ children }) => {
  const { loggedUser } = useContext(CreateAuthContext);

  if (!loggedUser.isLogged) return <Navigate to={routesName.LOGIN} replace />;

  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        {children}
      </div>
    </>
  );
};

export default PrivateRoute;
