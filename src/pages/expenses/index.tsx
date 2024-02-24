import { Form, Select, Table, type TableColumnsType } from "antd";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashCan, FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import styles from "./expenses.module.scss";
import CustomInput from "../../ui/input";
import { FormEvent, useContext, useEffect, useState } from "react";
import { CreateAuthContext } from "../../context/AuthContext";
import CustomButton from "../../ui/button";
import Modal from "../../components/modal";
import { DataType } from "../../interfaces";
import { years } from "../../constants";
import {
  useAddData,
  useDeleteData,
  useGetAllData,
  useUpdateData,
} from "../../hooks/useMutationData";

interface DataTypeLocale {
  key: React.Key;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const Expenses = () => {
  const [form] = Form.useForm();
  const [expensesData, setExpensesData] = useState([]);
  const [noChangeData, setNoChangeData] = useState([]);
  const [actionName, setActionName] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const { loggedUser } = useContext(CreateAuthContext);
  const userId = loggedUser?.user?.id;
  const [currentData, setCurrentData] = useState<DataType>({
    userId,
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const columns: TableColumnsType<DataTypeLocale> = [
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
              style={{ fontSize: 22, marginRight: 15, color: "#5932ea" }}
              onClick={() => openUpdateModal(data)}
            >
              <MdEdit />
            </a>
            <a
              style={{ fontSize: 20, color: "#d70606" }}
              onClick={() => deleteExpense(data.id)}
            >
              <FaRegTrashCan />
            </a>
          </>
        );
      },
    },
  ];

  const handleYearChange = (year: string) => {
    form.resetFields();
    setSelectedYear(year);
    setExpensesData(
      noChangeData?.filter((item: DataType) => {
        const itemYear = item.date.split("-")[0];
        return itemYear === year;
      })
    );
  };

  const handleSearch = (value: string) => {
    setExpensesData(
      noChangeData?.filter((item: DataType) =>
        item.category.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (value === "") handleYearChange(selectedYear);
  };

  const handleSubmit = (e: FormEvent) => {
    setActionName("addData");
    e.preventDefault();
    setIsShowModal(true);
  };

  const addNewExpense = async (data: DataType) => {
    if (userId) {
      const newData = { ...data, userId: userId };
      mutateAdd({
        url: "expenses/",
        data: newData,
      });
    }
  };

  const openUpdateModal = (data: DataType) => {
    setActionName("updateData");
    setCurrentData(data);
    setIsShowModal(true);
  };

  const updateExpense = async (data: DataType) => {
    if (data.id) {
      mutateUpdate({
        url: "expenses/",
        data,
        id: data.id,
      });
    }
  };

  const deleteExpense = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        mutateDelete({ url: "expenses/", id });
      }
    });
  };

  const getExpensesData = async () => {
    if (userId) {
      mutate({ url: "expenses", userId });
    }
  };

  const { isLoading, isError, error, mutate } = useGetAllData(
    setExpensesData,
    setNoChangeData
  );

  const { isLoadingAdd, isErrorAdd, errorAdd, mutateAdd } = useAddData(
    setIsShowModal,
    getExpensesData
  );

  const { isLoadingUpdate, isErrorUpdate, errorUpdate, mutateUpdate } =
    useUpdateData(setIsShowModal, getExpensesData);

  const { isLoadingDelete, isErrorDelete, errorDelete, mutateDelete } =
    useDeleteData(getExpensesData);

  useEffect(() => {
    handleYearChange(years[years.length - 1]);
  }, [noChangeData]);

  useEffect(() => {
    getExpensesData();
  }, []);

  if (isLoading || isLoadingAdd || isLoadingUpdate || isLoadingDelete) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (isError || isErrorAdd || isErrorUpdate || isErrorDelete) {
    return toast.error(`${error ?? errorAdd ?? errorUpdate ?? errorDelete}`);
  }

  return (
    <div className={styles.expenses}>
      <div className={styles.expenses__body}>
        <Modal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          addNewData={addNewExpense}
          updateData={updateExpense}
          currentData={currentData}
          actionName={actionName}
        />
        <div className={styles.expenses__header}>
          <h2>Expenses list</h2>
          <Select
            showSearch
            defaultValue={years[years.length - 1]}
            style={{ width: 80 }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={years.map((year) => ({
              label: year,
              value: year,
            }))}
            onChange={(e) => handleYearChange(e)}
          />
          <form onSubmit={handleSubmit} className={styles.expenses__form}>
            <CustomButton
              children="Add New"
              icon={<FaPlus />}
              htmlType="submit"
            />
          </form>
          <Form
            form={form}
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
