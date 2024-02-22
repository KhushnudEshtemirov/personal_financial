import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { SlArrowRight } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";
import { TiHome } from "react-icons/ti";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";

import styles from "./sidebar.module.scss";
import userImg from "../../assets/images/user.png";
import logo from "../../assets/images/logo.png";
import { CreateAuthContext } from "../../context/AuthContext";

const MenuItems = [
  { id: 0, name: "Home", icon: <TiHome />, link: "/" },
  { id: 1, name: "Expenses", icon: <GiPayMoney />, link: "/expenses" },
  { id: 2, name: "Income", icon: <GiReceiveMoney />, link: "/income" },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const { loggedUser } = useContext(CreateAuthContext);

  const activePath = MenuItems.find((item) => item.link === pathname);

  const [leftValue, setLeftValue] = useState(true);
  const [activeId, setActiveId] = useState(activePath?.id);

  const miniLeft = () => {
    setLeftValue(!leftValue);
  };

  return (
    <div className={`${styles.sidebar} ${leftValue ? "" : styles.hidden}`}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__top}>
          <div className={styles.sidebar__setting}>
            <img src={logo} width={52} height={50} onClick={miniLeft} />
          </div>
          <span className={styles.sidebar__dashboard}>FM</span>
        </div>
        <div className={styles.sidebar__middle}>
          <ul>
            {MenuItems.map((menu) => (
              <li
                key={menu.id}
                className={activeId === menu.id ? styles.active : ""}
                onClick={() => setActiveId(menu.id)}
              >
                <Link to={menu.link}>
                  {menu.icon} <span>{menu.name}</span>
                  <SlArrowRight />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sidebar__bottom}>
          <div className={styles.sidebar__user}>
            <div className={styles.sidebar__user_img}>
              <img src={userImg} alt="user image" />
            </div>
            <div className={styles.sidebar__name}>
              <p>{loggedUser.user?.name}</p>
              <span>{loggedUser.user?.email}</span>
            </div>
            <div
              className={styles.sidebar__logout}
              title="Logout"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              <FiLogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
