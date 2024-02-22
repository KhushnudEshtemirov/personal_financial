import { Form, Table, type TableColumnsType } from "antd";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashCan, FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import styles from "./expenses.module.scss";
import CustomInput from "../../ui/input";
import { FormEvent, useContext, useEffect, useState } from "react";
import { API } from "../../services/api";
import { CreateAuthContext } from "../../context/AuthContext";
import CustomButton from "../../ui/button";
import Modal from "../../components/modal";
import { ExpensesType } from "../../interfaces";

interface DataType {
  key: React.Key;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const Expenses = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [noChangeData, setNoChangeData] = useState([]);
  const [actionName, setActionName] = useState("updateExpense");
  const [isShowModal, setIsShowModal] = useState(false);
  const { loggedUser } = useContext(CreateAuthContext);
  const userId = loggedUser?.user?.id;
  const [currentData, setCurrentData] = useState<ExpensesType>({
    userId,
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Category",
      dataIndex: "category",
      fixed: "left",
      width: 200,
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (data) => {
        return (
          <>
            <a
              style={{ fontSize: 22, marginRight: 10, color: "#5932ea" }}
              onClick={() => openUpdateModal(data)}
            >
              <MdEdit />
            </a>
            <a style={{ fontSize: 20, color: "#d70606" }}>
              <FaRegTrashCan />
            </a>
          </>
        );
      },
    },
  ];

  const handleSearch = (value: string) => {
    setExpensesData(
      noChangeData.filter((item: DataType) =>
        item.category.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSubmit = (e: FormEvent) => {
    setActionName("addExpense");
    e.preventDefault();
    setIsShowModal(true);
  };

  const addNewExpense = async (data: ExpensesType) => {
    if (userId) {
      const newData = { ...data, userId: userId };
      const response = await API.addNewExpense(newData)
        .then((res) => res.data)
        .catch((err) => toast.error(err));

      if (response) {
        setIsShowModal(false);
        getExpensesData();
        toast.success("Added successfully");
      }
    }
  };

  const openUpdateModal = (data: ExpensesType) => {
    setActionName("updateExpense");
    setCurrentData(data);
    setIsShowModal(true);
  };

  const updateExpense = async (data: ExpensesType) => {
    if (data.id) {
      const response = await API.updateExpense(data, data.id)
        .then((res) => res.data)
        .catch((err) => toast.error(err));

      if (response) {
        setIsShowModal(false);
        getExpensesData();
        toast.success("Updated successfully");
      }
    }
  };

  const getExpensesData = async () => {
    if (userId) {
      const response = await API.getAllExpensesData({ userId })
        .then((res) =>
          res.data.reverse().map((item: ExpensesType) => ({
            ...item,
            key: item.id,
          }))
        )
        .catch((err) => toast.error(err));
      setExpensesData(response);
      setNoChangeData(response);
    }
  };

  useEffect(() => {
    getExpensesData();
  }, []);

  return (
    <div className={styles.expenses}>
      <div className={styles.expenses__body}>
        <Modal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          addNewExpense={addNewExpense}
          updateExpense={updateExpense}
          currentData={currentData}
          actionName={actionName}
        />
        <div className={styles.expenses__header}>
          <h2>Expenses list</h2>
          <form onSubmit={handleSubmit} className={styles.expenses__form}>
            <CustomButton
              children="Add New"
              icon={<FaPlus />}
              htmlType="submit"
            />
          </form>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{ remember: true }}
            onValuesChange={(e) => handleSearch(e.search)}
            autoComplete="off"
            className={styles.expenses__antd_form}
          >
            <CustomInput
              icon={<FiSearch />}
              type="text"
              placeholder="Search by categories"
              className={styles.expenses__input}
              name="search"
              required={false}
            />
          </Form>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={expensesData}
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
