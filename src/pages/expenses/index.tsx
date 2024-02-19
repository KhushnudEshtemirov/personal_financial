import { Form, Table, type TableColumnsType, type TableProps } from "antd";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

import Input from "../../ui/input";
import styles from "./expenses.module.scss";

interface DataType {
  key: React.Key;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Category",
    dataIndex: "category",
    fixed: "left",
    width: 200,
  },
  {
    title: "Amount",
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
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => {
      return (
        <>
          <a style={{ fontSize: 22, marginRight: 10, color: "#6b6b6b" }}>
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

const data: DataType[] = [
  {
    key: "1",
    category: "John Brown",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "2",
    category: "Jim Green",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "3",
    category: "Joe Black",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "4",
    category: "Jim Red",
    amount: 88,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "5",
    category: "John Brown",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "6",
    category: "Jim Green",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "7",
    category: "Joe Black",
    amount: 98,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
  {
    key: "8",
    category: "Jim Red",
    amount: 88,
    date: "11.07.2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ad illo voluptates placeat consequatur!",
  },
];

const Expenses = () => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className={styles.expenses}>
      <div className={styles.expenses__body}>
        <div className={styles.expenses__header}>
          <h2>Expenses list</h2>
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
              icon={<FiSearch />}
              type="text"
              placeholder="Search..."
              className={styles.expenses__input}
              name="search"
              required={false}
            />
          </Form>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
