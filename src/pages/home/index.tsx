import { Select, Progress, Flex, Tooltip } from "antd";
import { GoArrowUpLeft, GoArrowDownRight } from "react-icons/go";

import styles from "./home.module.scss";
import { useContext, useEffect, useState } from "react";
import { expenses_data } from "../../mockData/expenses";
import { months, years } from "../../constants";
import { CreateAuthContext } from "../../context/AuthContext";
import { API } from "../../services/api";
import { DataType } from "../../interfaces";
import { toast } from "react-toastify";

const Home = () => {
  const { loggedUser } = useContext(CreateAuthContext);
  const userId = loggedUser?.user?.id;
  const [activeMonthId, setActiveMonthId] = useState(0);
  const [expensesData, setExpensesData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const getActiveData = (id: number) => {
    const activeData = expensesData.filter((item: DataType) => {
      const monthId = parseInt(item.date.split("-")[1]);
      if (monthId === id + 1) return item;
    });

    return activeData;
  };

  const handleMonthChange = (e: number) => {
    const activeMonth = expenses_data.find((item) => item.id === e);
    if (activeMonth) setActiveMonthId(activeMonth.id);

    const totalExpense = getActiveData(e).reduce((total, data: DataType) => {
      const amount = parseInt(data.amount);
      return total + amount;
    }, 0);

    setTotalExpense(totalExpense);
  };

  const getExpensesData = async () => {
    if (userId) {
      const response = await API.getAllData({ url: "expenses", userId })
        .then((res) =>
          res.data.reverse().map((item: DataType) => ({
            ...item,
            key: item.id,
          }))
        )
        .catch((err) => toast.error(err));
      setExpensesData(response);
    }
  };

  useEffect(() => {
    getExpensesData();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home__body}>
        <div className={styles.home__right_stat}>
          <div className={styles.home__right_header}>
            <h2>Expenses and Income</h2>
            <Select
              showSearch
              defaultValue={months[0]}
              value={months[activeMonthId]}
              style={{ width: 120 }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLocaleLowerCase()
                  .includes(input.toLocaleLowerCase())
              }
              options={months.map((month, index) => ({
                label: month,
                value: index,
              }))}
              onChange={(e) => handleMonthChange(parseInt(e))}
            />
          </div>
          <div className={styles.home__right_body}>
            <div className={styles.home__white_circle}>
              <Flex gap="small" wrap="wrap">
                <Tooltip>
                  <Progress
                    size={250}
                    percent={60}
                    showInfo={false}
                    strokeColor="#fe3c3c"
                    success={{ percent: 30 }}
                    type="circle"
                  />
                </Tooltip>
              </Flex>
              <div className={styles.home__expenses_income}>
                <div className={styles.home__income}>
                  <GoArrowDownRight />
                  <span>$8M</span>
                </div>
                <div className={styles.home__expenses}>
                  <GoArrowUpLeft />
                  <span>${totalExpense}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home__statistic}>
          <div className={styles.home__statistic_header}>
            <h2>Annual Profit ($M)</h2>
            <Select
              showSearch
              defaultValue={years[0]}
              style={{ width: 80 }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={years.map((year) => ({
                label: year,
                value: year,
              }))}
              onChange={() => setActiveMonthId(0)}
            />
          </div>
          <div className={styles.home__statistic_graph}>
            {expenses_data.map((item) => (
              <div
                className={`${styles.home__column} ${
                  item.id === activeMonthId ? styles.active : ""
                }`}
                key={item.id}
              >
                <div className={styles.home__percent}>${item.percent}</div>
                <div className={styles.home__outer_div}>
                  <div style={{ height: item.percent * 3 }}></div>
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
