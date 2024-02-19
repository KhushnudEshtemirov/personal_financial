import { Select, Progress } from "antd";
import { GoArrowUpLeft, GoArrowDownRight } from "react-icons/go";

import styles from "./home.module.scss";
import { useState } from "react";

const years = ["2024", "2023", "2022", "2021"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const expenses_data = [
  { id: 0, name: "Jan", percent: 20, value: "January" },
  { id: 1, name: "Feb", percent: 31, value: "February" },
  { id: 2, name: "Mar", percent: 24, value: "March" },
  { id: 3, name: "Apr", percent: 50, value: "April" },
  { id: 4, name: "May", percent: 42, value: "May" },
  { id: 5, name: "Jun", percent: 15, value: "June" },
  { id: 6, name: "Jul", percent: 68, value: "July" },
  { id: 7, name: "Aug", percent: 90, value: "August" },
  { id: 8, name: "Sep", percent: 28, value: "September" },
  { id: 9, name: "Oct", percent: 8, value: "October" },
  { id: 10, name: "Nov", percent: 75, value: "November" },
  { id: 11, name: "Dec", percent: 12, value: "December" },
];

const Home = () => {
  const [activeMonthId, setActiveMonthId] = useState(0);

  const handleMonthChange = (e: string) => {
    const activeMonth = expenses_data.find((item) => item.value === e);
    if (activeMonth) setActiveMonthId(activeMonth.id);
  };

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
              options={months.map((month) => ({
                label: month,
                value: month,
              }))}
              onChange={(e) => handleMonthChange(e)}
            />
          </div>
          <div className={styles.home__right_body}>
            <div className={styles.home__white_circle}>
              <Progress
                type="circle"
                size={250}
                percent={60}
                showInfo={false}
                strokeColor="#fe3c3c"
                trailColor="#10d116"
              />
              <div className={styles.home__expenses_income}>
                <div className={styles.home__income}>
                  <GoArrowDownRight />
                  <span>$8M</span>
                </div>
                <div className={styles.home__expenses}>
                  <GoArrowUpLeft />
                  <span>$6M</span>
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
