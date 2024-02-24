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

const calculateColorPercentage = (
  totalExpense: number,
  totalIncome: number
) => {
  return totalExpense + totalIncome !== 0
    ? {
        "0%": "green",
        [`${(totalIncome * 100) / (totalExpense + totalIncome)}%`]: "green",
        [`${(totalIncome * 100) / (totalExpense + totalIncome) + 0.1}%`]: "red",
      }
    : "#e2e2e2";
};

const Home = () => {
  const { loggedUser } = useContext(CreateAuthContext);
  const userId = loggedUser?.user?.id;
  const [activeMonthId, setActiveMonthId] = useState(0);
  const [expensesData, setExpensesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [graphData, setGraphData] = useState<
    { amount: number; name: string }[]
  >([]);

  const getActiveData = (id: number, data: DataType[]) => {
    const activeData = data.filter((item: DataType) => {
      const monthNumber = parseInt(item.date.split("-")[1]);
      const year = item.date.split("-")[0];
      if (monthNumber === id + 1 && year === selectedYear) return item;
    });

    return activeData;
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleMonthChange = ({
    id,
    actionName,
  }: {
    id: number;
    actionName: string;
  }) => {
    const activeMonth = expenses_data.find((item) => item.id === id);
    if (activeMonth && actionName === "change")
      setActiveMonthId(activeMonth.id);

    const totalExp = getActiveData(id, expensesData).reduce(
      (total, data: DataType) => {
        const amount = parseInt(data.amount);
        return total + amount;
      },
      0
    );

    const totalInc = getActiveData(id, incomeData).reduce(
      (total, data: DataType) => {
        const amount = parseInt(data.amount);
        return total + amount;
      },
      0
    );

    if (actionName === "change") {
      setTotalExpense(totalExp);
      setTotalIncome(totalInc);
    }

    return { totalExp, totalInc };
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

  const getIncomeData = async () => {
    if (userId) {
      const response = await API.getAllData({ url: "income", userId })
        .then((res) =>
          res.data.reverse().map((item: DataType) => ({
            ...item,
            key: item.id,
          }))
        )
        .catch((err) => toast.error(err));
      setIncomeData(response);
    }
  };

  const calculateProfit = () => {
    for (let i = 1; i <= 12; i++) {
      const { totalExp, totalInc } = handleMonthChange({
        id: i - 1,
        actionName: "profit",
      });
      setGraphData((prev) => [
        ...prev,
        {
          amount: totalInc > totalExp ? totalInc - totalExp : 0,
          name: expenses_data[i - 1].name,
        },
      ]);
    }
  };

  useEffect(() => {
    handleMonthChange({ id: 0, actionName: "change" });

    setGraphData([]);

    if (incomeData.length) calculateProfit();
  }, [incomeData, selectedYear]);

  useEffect(() => {
    getExpensesData();
    getIncomeData();
  }, []);

  let maxLength = 3000;
  graphData.map((item) => {
    if (item.amount > maxLength) maxLength = item.amount;
  });

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
              onChange={(e) =>
                handleMonthChange({ id: parseInt(e), actionName: "change" })
              }
            />
          </div>
          <div className={styles.home__right_body}>
            <div className={styles.home__white_circle}>
              <Flex gap="small" wrap="wrap">
                <Tooltip>
                  <Progress
                    size={250}
                    percent={100}
                    showInfo={false}
                    strokeColor={calculateColorPercentage(
                      totalExpense,
                      totalIncome
                    )}
                    type="circle"
                  />
                </Tooltip>
              </Flex>
              <div className={styles.home__expenses_income}>
                <div className={styles.home__income}>
                  <GoArrowDownRight />
                  <span>${totalIncome}</span>
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
            <h2>Annual Profit ($)</h2>
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
              onChange={(e) => {
                handleYearChange(e), setActiveMonthId(0);
              }}
            />
          </div>
          <div className={styles.home__statistic_graph}>
            {graphData &&
              graphData.map((item, index) => (
                <div
                  className={`${styles.home__column} ${
                    index === activeMonthId ? styles.active : ""
                  }`}
                  key={index}
                >
                  <div className={styles.home__percent}>${item.amount}</div>
                  <div
                    className={styles.home__outer_div}
                    style={{
                      height: `${(item.amount * 100) / maxLength}%`,
                    }}
                  ></div>
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
