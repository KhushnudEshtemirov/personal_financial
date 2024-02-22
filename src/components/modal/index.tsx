import { Form } from "antd";
import { Input } from "antd";

import styles from "./modal.module.scss";
import CustomInput from "../../ui/input";
import CustomButton from "../../ui/button";
import { ExpensesType } from "../../interfaces";
import { useEffect } from "react";

type ModalType = {
  isShowModal: boolean;
  setIsShowModal: (val: boolean) => void;
  addNewExpense: (data: ExpensesType) => void;
  updateExpense: (data: ExpensesType) => void;
  currentData: ExpensesType;
  actionName: string;
};

const { TextArea } = Input;

const Modal = ({
  isShowModal,
  setIsShowModal,
  addNewExpense,
  currentData,
  actionName,
  updateExpense,
}: ModalType) => {
  const [form] = Form.useForm();

  const onFinish = (data: {
    category: string;
    amount: string;
    description: string;
    date: string;
  }) => {
    if (actionName === "updateExpense")
      updateExpense({ ...data, id: currentData.id });
    else addNewExpense(data);

    form.resetFields();
  };

  useEffect(() => {
    if (actionName === "updateExpense") {
      form.setFieldValue("category", currentData.category);
      form.setFieldValue("amount", currentData.amount);
      form.setFieldValue("date", currentData.date);
      form.setFieldValue("description", currentData.description);
    }
  }, [currentData]);

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modal__black_window} ${
          isShowModal ? styles.modal__black_window_show : ""
        }`}
      />
      <div
        className={`${styles.modal__body} ${
          isShowModal ? styles.modal__body_show : ""
        }`}
      >
        <h2 style={{ marginBottom: 20 }}>Add Expense</h2>
        <Form
          name="modal"
          layout="vertical"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className={styles.modal__inputs}>
            <CustomInput
              label="Category"
              type="text"
              className={styles.modal__input}
              name="category"
              required={true}
            />
            <CustomInput
              label="Amount ($M)"
              type="text"
              className={styles.modal__input}
              name="amount"
              required={true}
            />
          </div>
          <CustomInput
            label="Date"
            type="date"
            className={styles.modal__input}
            name="date"
            required={true}
          />
          <div className={styles.modal__text}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input required field!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className={styles.modal__button}>
            <CustomButton children="Save" htmlType="submit" />
            <CustomButton
              children="Cancel"
              className={styles.modal__cancel_btn}
              setIsShowModal={setIsShowModal}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Modal;
