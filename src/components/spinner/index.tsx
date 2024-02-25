import { Spin } from "antd";

import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
