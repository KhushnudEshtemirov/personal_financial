import { Select, Progress } from "antd";
import { GoArrowUpLeft, GoArrowDownRight } from "react-icons/go";

import styles from "./home.module.scss";
import { useState } from "react";
import { expenses_data } from "../../mockData/expenses";
import { months, years } from "../../constants";

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
