import { useContext } from "react";
import styles from "./header.module.scss";

import { BsMoon, BsBell } from "react-icons/bs";
import { CreateAuthContext } from "../../context/AuthContext";

const Header = () => {
  const { loggedUser } = useContext(CreateAuthContext);

  return (
    <div className={styles.header}>
      <h2>Hello {loggedUser.user?.name} 👋,</h2>
      <div className={styles.header__right}>
        <ul>
          <li>
            <BsMoon />
          </li>
          <li>
            <BsBell />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
