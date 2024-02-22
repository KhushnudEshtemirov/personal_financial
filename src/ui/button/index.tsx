import { Button } from "antd";
import { ReactNode } from "react";

import styles from "./button.module.scss";

type ButtonType = {
  icon?: ReactNode;
  className?: string;
  children: string;
  size?: "large" | "middle" | "small";
  htmlType?: "button" | "submit" | "reset" | undefined;
  setIsShowModal?: (val: boolean) => void;
};

const CustomButton = ({
  icon,
  className,
  children,
  size = "middle",
  htmlType = "button",
  setIsShowModal = () => {},
}: ButtonType) => {
  return (
    <Button
      type="primary"
      icon={icon}
      size={size}
      className={`${className} ${styles.button}`}
      htmlType={htmlType}
      onClick={() => setIsShowModal(false)}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
