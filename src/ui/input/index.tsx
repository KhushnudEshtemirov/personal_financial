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
};

const CustomInput = ({
  icon,
  type = "text",
  placeholder,
  className,
  name,
  label,
  required,
}: InputType) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: required, message: "Please input your username!" }]}
      noStyle={true}
    >
      <Input
        placeholder={placeholder}
        type={type}
        prefix={icon}
        className={`${styles.input} ${className}`}
      />
    </Form.Item>
  );
};

export default CustomInput;
