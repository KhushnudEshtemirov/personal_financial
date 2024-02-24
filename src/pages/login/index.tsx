import { useContext } from "react";
import { Form } from "antd";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import CustomInput from "../../ui/input";
import styles from "./login.module.scss";
import { API } from "../../services/api";
import { CreateAuthContext } from "../../context/AuthContext";
import CustomButton from "../../ui/button";
import login from "../../assets/images/login.jpeg";

const Login = () => {
  const { changeUser } = useContext(CreateAuthContext);

  const { isLoading, isError, error, mutate } = useMutation(
    async (data: { email: string; password: string }) =>
      await API.getUserFilter(data).then((res) => res.data),
    {
      onSuccess: (data) => {
        if (data.length > 0) {
          const user = { isLogged: true, user: data[0] };
          localStorage.setItem("user", JSON.stringify(user));
          changeUser(user);
        } else {
          toast.error("Email or password incorrect. Please try again.");
        }
      },
    }
  );

  const onFinish = (data: { email: string; password: string }) => {
    mutate(data);
  };

  if (isLoading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (isError) {
    return toast.error(`${error}`);
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <div className={styles.login__image}>
          <img src={login} alt="login" />
        </div>
        <div className={styles.login__form}>
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
    </div>
  );
};

export default Login;
