import { ReactNode, createContext, useState } from "react";
import { IUser } from "../interfaces";
import { loggedUser } from "../mockData/user";

interface ILoggedUser {
  isLogged: boolean;
  user: IUser | null;
}

interface ICreateAuthContext {
  loggedUser: ILoggedUser;
  changeUser: (a: ILoggedUser) => void;
}

export const CreateAuthContext = createContext<ICreateAuthContext>({
  loggedUser: {} as ILoggedUser,
  changeUser: () => {},
});

const initialData: ILoggedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : loggedUser;

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState(initialData);

  const changeUser = (data: ILoggedUser) => {
    setUserData(data);
  };

  return (
    <CreateAuthContext.Provider value={{ loggedUser: userData, changeUser }}>
      {children}
    </CreateAuthContext.Provider>
  );
};

export default AuthContext;
