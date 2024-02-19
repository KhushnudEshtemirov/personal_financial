import styles from "./header.module.scss";

import { BsMoon, BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const Header = () => (
  <div className={styles.header}>
    <h2>Salom Khushnud 👋,</h2>
    {/* <div className={styles.header__right}>
      <ul>
        <li>
          <BsMoon />
        </li>
        <li>
          <BsBell />
        </li>
        <li>
          <FiSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Qidiruv"
            autoComplete="off"
          />
        </li>
      </ul>
    </div> */}
  </div>
);

export default Header;
