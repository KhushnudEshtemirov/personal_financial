import styles from "./home.module.scss";

const expenses_data = [
  { id: 0, name: "Jan", percent: 20 },
  { id: 1, name: "Feb", percent: 31 },
  { id: 2, name: "Mar", percent: 24 },
  { id: 3, name: "Apr", percent: 50 },
  { id: 4, name: "May", percent: 42 },
  { id: 5, name: "Jun", percent: 15 },
  { id: 6, name: "Jul", percent: 68 },
  { id: 7, name: "Aug", percent: 90 },
  { id: 8, name: "Sep", percent: 28 },
  { id: 9, name: "Oct", percent: 8 },
  { id: 10, name: "Nov", percent: 75 },
  { id: 11, name: "Dec", percent: 12 },
];

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__body}>
        <div className={styles.home__statistic}>
          <div className={styles.home__statistic_header}>
            <h2>Annual Profit ($M)</h2>
            <select name="stat-year" id="year" defaultValue="2022">
              <option value="years">Select year</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className={styles.home__statistic_graph}>
            {expenses_data.map((item) => (
              <div className={styles.home__column} key={item.id}>
                <div className={styles.home__percent}>${item.percent}M</div>
                <div className={styles.home__outer_div}>
                  <div style={{ height: item.percent * 3 }}></div>
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.home__right_stat}>
          <div className={styles.home__right_header}>
            <h2>Expenses and Income Statistics</h2>
          </div>
          <div className={styles.home__right_body}>
            <div className={styles.home__white_circle}>
              <div className={styles.home__blue_sector}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="250px"
                  height="250px"
                >
                  <defs>
                    <linearGradient id="GradientColor">
                      <stop offset="0%" stopColor="#BB84EE" />
                      <stop offset="100%" stopColor="#4623E9" />
                    </linearGradient>
                  </defs>
                  <circle cx="110" cy="125" r="90" />
                </svg>
              </div>
              <div className={styles.home__red_sector}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="250px"
                  height="250px"
                >
                  <defs>
                    <linearGradient id="GradientColor1">
                      <stop offset="0%" stopColor="#CDF4FF" />
                      <stop offset="100%" stopColor="#FF007A" />
                    </linearGradient>
                  </defs>
                  <circle cx="122" cy="136" r="90" />
                </svg>
              </div>
              <div className={styles.home__gray_ring}>
                <h2>65%</h2>
                <span>Umumiy O’quvchilar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
