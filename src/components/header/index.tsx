import { useContext } from "react";
import { BsMoon, BsBell } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

import styles from "./header.module.scss";
import { CreateAuthContext } from "../../context/AuthContext";

interface PropsType {
  setIsShowSidebar: (val: boolean) => void;
}

const Header = ({ setIsShowSidebar }: PropsType) => {
  const { loggedUser } = useContext(CreateAuthContext);

  return (
    <div className={styles.header}>
      <div
        className={styles.header__sidebar_menu}
        onClick={() => setIsShowSidebar(true)}
      >
        <IoMdMenu />
      </div>
      <h2>Hello {loggedUser.user?.name.split(" ")[0]} 👋,</h2>
      <div className={styles.header__right}>
        <ul>
          <li className={styles.header__change_theme}>
            <BsMoon />
          </li>
          <li className={styles.header__notification}>
            <BsBell />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
