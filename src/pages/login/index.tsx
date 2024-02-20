import { Form } from "antd";

import Input from "../../ui/input";
import styles from "./login.module.scss";
import { API } from "../../services/api";
import { useContext } from "react";
import { CreateAuthContext } from "../../context/AuthContext";

const Login = () => {
  const { changeUser } = useContext(CreateAuthContext);
  const onFinish = async (data: { email: string; password: string }) => {
    const response = await API.getUserFilter(data)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (response.length > 0) {
      const user = { isLogged: true, user: response[0] };
      changeUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className={styles.expenses}>
      <div className={styles.expenses__body}>
        <div className={styles.expenses__header}>
          <h2>Login</h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Input
              type="email"
              placeholder="Search..."
              className={styles.expenses__input}
              name="email"
              required={false}
            />
            <Input
              type="password"
              placeholder=""
              className={styles.expenses__input}
              name="password"
              required={false}
            />

            <button type="submit">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
