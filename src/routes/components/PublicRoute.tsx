import { FC, ReactNode, useContext } from "react";
import { CreateAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { routesName } from "../../constants/routes";

interface IProps {
  children: ReactNode;
}

const PublicRoute: FC<IProps> = ({ children }) => {
  const { loggedUser } = useContext(CreateAuthContext);
  if (!loggedUser.isLogged) return children;
  else return <Navigate to={routesName.HOME} replace />;
};

export default PublicRoute;
