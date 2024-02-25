import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { SlArrowRight } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";
import { TiHome } from "react-icons/ti";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { BsMoon, BsBell } from "react-icons/bs";

import styles from "./sidebar.module.scss";
import userImg from "../../assets/images/user.png";
import logo from "../../assets/images/logo.png";
import { CreateAuthContext } from "../../context/AuthContext";

interface PropsType {
  setIsShowSidebar: (val: boolean) => void;
  isShowSidebar: boolean;
}

const MenuItems = [
  { id: 0, name: "Home", icon: <TiHome />, link: "/" },
  { id: 1, name: "Expenses", icon: <GiPayMoney />, link: "/expenses" },
  { id: 2, name: "Income", icon: <GiReceiveMoney />, link: "/income" },
];

const Sidebar = ({ setIsShowSidebar, isShowSidebar }: PropsType) => {
  const { pathname } = useLocation();
  const { loggedUser } = useContext(CreateAuthContext);

  const activePath = MenuItems.find((item) => item.link === pathname);

  const [isHiddenSidebar, setIsHiddenSidebar] = useState(false);
  const [activeId, setActiveId] = useState(activePath?.id);
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);

  const handleHideSidebar = () => {
    setIsHiddenSidebar(!isHiddenSidebar);
  };

  const updateDeviceSize = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setDeviceSize(window.innerWidth);
      });
    }
  };

  useEffect(() => {
    updateDeviceSize();
  }, []);

  return (
    <>
      <div
        onClick={() => setIsShowSidebar(false)}
        className={`${styles.sidebar__window} ${
          isShowSidebar ? styles.sidebar__window_block : ""
        }`}
      ></div>
      <div
        className={`${styles.sidebar} ${
          deviceSize <= 850 || isHiddenSidebar ? styles.hidden : ""
        } ${isShowSidebar ? styles.show : ""}`}
      >
        <div className={styles.sidebar__container}>
          <div
            className={styles.sidebar__top}
            onClick={() => setIsShowSidebar(false)}
          >
            <div className={styles.sidebar__setting}>
              <img
                src={logo}
                width={52}
                height={50}
                onClick={handleHideSidebar}
              />
            </div>
            <span className={styles.sidebar__dashboard}>
              Financial Management
            </span>
          </div>
          <div className={styles.sidebar__middle}>
            <ul>
              {MenuItems.map((menu) => (
                <li
                  key={menu.id}
                  className={activeId === menu.id ? styles.active : ""}
                  onClick={() => {
                    setActiveId(menu.id);
                    setIsShowSidebar(false);
                  }}
                >
                  <Link to={menu.link}>
                    {menu.icon} <span>{menu.name}</span>
                    <SlArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className={styles.sidebar__functions}>
            <li
              className={styles.sidebar__change_theme}
              onClick={() => setIsShowSidebar(false)}
            >
              <BsMoon />
            </li>
            <li
              className={styles.sidebar__notification}
              onClick={() => setIsShowSidebar(false)}
            >
              <BsBell />
            </li>
          </ul>
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
    </>
  );
};

export default Sidebar;
