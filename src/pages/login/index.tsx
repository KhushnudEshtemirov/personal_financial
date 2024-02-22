import { useContext } from "react";
import { Form } from "antd";
import { toast } from "react-toastify";

import CustomInput from "../../ui/input";
import styles from "./login.module.scss";
import { API } from "../../services/api";
import { CreateAuthContext } from "../../context/AuthContext";
import CustomButton from "../../ui/button";

const Login = () => {
  const { changeUser } = useContext(CreateAuthContext);

  const onFinish = async (data: { email: string; password: string }) => {
    const response = await API.getUserFilter(data)
      .then((res) => res.data)
      .catch((err) => toast.error(err));

    if (response.length > 0) {
      const user = { isLogged: true, user: response[0] };
      changeUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      toast.error("Email or password incorrect. Please try again.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <div className={styles.login__header}>
          <h2>Login</h2>
        </div>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <CustomInput
            type="email"
            label="Email"
            placeholder="Enter email"
            className={styles.login__input}
            name="email"
            required={true}
          />
          <CustomInput
            type="password"
            label="Password"
            placeholder="Enter password"
            className={styles.login__input}
            name="password"
            required={true}
          />

          <div className={styles.login__button}>
            <CustomButton children="Login" size="large" htmlType="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
