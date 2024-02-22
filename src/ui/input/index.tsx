import { ReactNode } from "react";
import { Form, Input } from "antd";

import styles from "./input.module.scss";

type InputType = {
  icon?: ReactNode;
  type: string;
  placeholder?: string;
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  value?: string;
};

const CustomInput = ({
  icon,
  type = "text",
  placeholder,
  className,
  name,
  label,
  required,
  value,
}: InputType) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: "Please input required field!" }]}
    >
      <Input
        value={value}
        placeholder={placeholder}
        type={type}
        prefix={icon}
        className={`${styles.input} ${className}`}
        autoComplete="off"
      />
    </Form.Item>
  );
};

export default CustomInput;
