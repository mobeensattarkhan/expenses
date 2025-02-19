// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase";

// // Chart.js
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Import icons from react-icons
// import { FaRegClock } from "react-icons/fa";
// import { IoMdAirplane, IoMdCard, IoIosAlert } from "react-icons/io";
// import { RiCheckboxMultipleLine } from "react-icons/ri";
// import { GiSettingsKnobs } from "react-icons/gi";
// import { FaPhone } from "react-icons/fa";
// import { BiSolidReport } from "react-icons/bi";

// // Import the CSS module
// import styles from "./Dashboard.module.css";

// // Import NewTrip and NewExpense components
// import NewTrip from "../NewTrip/NewTrip";
// import NewExpense from "../NewExpense/NewExpense";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [activeForm, setActiveForm] = useState(null); // Manage which form to display

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         navigate("/");
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   // Data for Team Spending Trend Chart
//   const teamSpendingData = {
//     labels: ["F3", "S3", "MB", "IS", "DW", "NQ", "BS"],
//     datasets: [
//       {
//         label: "Spending (€)",
//         data: [90, 70, 90, 50, 30, 40, 100],
//         backgroundColor: "#34d399",
//       },
//     ],
//   };

//   // Data for Day-to-Day Expenses Chart
//   const dayToDayExpensesData = {
//     labels: ["Accommodation", "Comms", "Services", "Food", "Fuel"],
//     datasets: [
//       {
//         label: "Expenses (%)",
//         data: [40, 20, 100, 80, 60],
//         backgroundColor: ["#6b5b95", "#d9ad7c", "#ef476f", "#ffd166", "#118ab2"],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         stacked: false,
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           drawBorder: false,
//         },
//       },
//     },
//     elements: {
//       bar: {
//         barThickness: "flex",
//         borderSkipped: false,
//         borderRadius: 5,
//       },
//     },
//     layout: {
//       padding: 10,
//     },
//   };

//   // Close the currently active form
//   const closeForm = () => setActiveForm(null);

//   return (
//     <div className={styles.dashboardContainer}>
//       {activeForm === "newTrip" && <NewTrip CloseForm={closeForm} />}
//       {activeForm === "newExpense" && <NewExpense CloseForm={closeForm} />}

//       {!activeForm && (
//         <div className={styles.allContent}>
//           <main className={styles.dashboardContent}>
//             <div className={`${styles.dashboardSection} ${styles.flexContainer}`}>
//               <div className={styles.dashboardSection + " " + styles.pendingTasks}>
//                 <h3>Pending Tasks</h3>
//                 <ul>
//                   <li>
//                     <FaRegClock /> Pending Approvals: <span>5</span>
//                   </li>
//                   <li>
//                     <IoMdAirplane /> New Trips Registered: <span>1</span>
//                   </li>
//                   <li>
//                     <RiCheckboxMultipleLine /> Unreported Expenses: <span>4</span>
//                   </li>
//                   <li>
//                     <GiSettingsKnobs /> Upcoming Expenses: <span>0</span>
//                   </li>
//                   <li>
//                     <FaPhone /> Unreported Advances: <span>€0.00</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className={styles.dashboardSection + " " + styles.recentExpenses}>
//                 <h3>Recent Expenses</h3>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Subject</th>
//                       <th>Employee</th>
//                       <th>Team</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>Office Supplies</td>
//                       <td>John Smith</td>
//                       <td>Marketing</td>
//                       <td>€150.00</td>
//                     </tr>
//                     <tr>
//                       <td>Business Lunch</td>
//                       <td>Sarah Jade</td>
//                       <td>Marketing</td>
//                       <td>€75.50</td>
//                     </tr>
//                     <tr>
//                       <td>Travel Expenses</td>
//                       <td>Mike Brown</td>
//                       <td>Operations</td>
//                       <td>€450.25</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className={styles.accessContainer}>
//               <h3>Quick Access</h3>
//               <div className={styles.quickAccess}>
//                 <button
//                   className={styles.quickAccessButton}
//                   onClick={() => setActiveForm("newExpense")}
//                 >
//                   <div className={styles.quickAccessIcon1}>
//                     <IoMdCard />
//                   </div>{" "}
//                   + New Expense
//                 </button>
//                 <button className={styles.quickAccessButton}>
//                 <div className={styles.quickAccessIcon2}>
//                   <IoIosAlert />
//                 </div>{" "}
//                 + Add Receipt
//               </button>
//               <button className={styles.quickAccessButton}>
//                 <div className={styles.quickAccessIcon3}>
//                   <BiSolidReport />
//                 </div>{" "}
//                 + Create Report
//               </button>
//                 <button
//                   className={styles.quickAccessButton}
//                   onClick={() => setActiveForm("newTrip")}
//                 >
//                   <div className={styles.quickAccessIcon4}>
//                     <IoMdAirplane />
//                   </div>{" "}
//                   + Create Trip
//                 </button>
//               </div>
//             </div>
//             <div className={styles.reports}>
//               <h3>Monthly Report</h3>
//               <div className={styles.charts}>
//                 <div className={styles.chart}>
//                   <h4>Team Spending Trend</h4>
//                   <Bar data={teamSpendingData} options={chartOptions} />
//                 </div>
//                 <div className={styles.chart}>
//                   <h4>Day-to-Day Expenses</h4>
//                   <Bar data={dayToDayExpensesData} options={chartOptions} />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// Chart.js imports
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Import icons from react-icons
import { FaRegClock } from "react-icons/fa";
import { IoMdAirplane, IoMdCard, IoIosAlert } from "react-icons/io";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaPhone } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";

// Import the CSS module
import styles from "./Dashboard.module.css";

// Import NewTrip and NewExpense components
import NewTrip from "../NewTrip/NewTrip";
import NewExpense from "../NewExpense/NewExpense";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);
  const [expensesData, setExpensesData] = useState([]);
  const [pendingExpenses, setPendingExpenses] = useState(0);
  const [completedExpenses, setCompletedExpenses] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch expenses data from Firestore
  const fetchExpensesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setExpensesData(data);

      // Calculate pending and completed expenses
      const pending = data.filter((expense) => expense.addToReport !== "yes").length;
      const completed = data.filter((expense) => expense.addToReport === "yes").length;

      setPendingExpenses(pending);
      setCompletedExpenses(completed);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  useEffect(() => {
    fetchExpensesData();
  }, []);

  // Close the currently active form
  const closeForm = () => setActiveForm(null);

  // Prepare chart data
  const chartData = {
    labels: expensesData.map((expense) => expense.subject || "Unknown"),
    datasets: [
      {
        label: "Amount",
        data: expensesData.map((expense) => parseFloat(expense.total) || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
    },
    elements: {
      bar: {
        barThickness: "flex",
        borderSkipped: false,
        borderRadius: 5,
      },
    },
    layout: {
      padding: 10,
    },
  };

  // Get the most recent expenses (latest 3)
  const recentExpenses = expensesData.slice(0, 3);

  return (
    <div className={styles.dashboardContainer}>
      {activeForm === "newTrip" && <NewTrip CloseForm={closeForm} />}
      {activeForm === "newExpense" && <NewExpense CloseForm={closeForm} />}

      {!activeForm && (
        <div className={styles.allContent}>
          <main className={styles.dashboardContent}>
            <div className={`${styles.dashboardSection} ${styles.flexContainer}`}>
              {/* Pending Tasks Section */}
              <div className={`${styles.dashboardSection} ${styles.pendingTasks}`}>
                <h3>Pending Tasks</h3>
                <ul>
                  <li>
                    <FaRegClock /> Pending: <span>{pendingExpenses}</span>
                  </li>
                  <li>
                    <IoMdAirplane /> New Trips Registered: <span>1</span>
                  </li>
                  <li>
                    <RiCheckboxMultipleLine /> Unreported Expenses: <span>{pendingExpenses}</span>
                  </li>
                  <li>
                    <GiSettingsKnobs /> Completed Expenses: <span>{completedExpenses}</span>
                  </li>
                  <li>
                    <FaPhone /> Unreported Advances: <span>€0.00</span>
                  </li>
                </ul>
              </div>

              {/* Recent Expenses Section */}
              <div className={`${styles.dashboardSection} ${styles.recentExpenses}`}>
                <h3>Recent Expenses</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Employee</th>
                      <th>Merchant</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentExpenses.length > 0 ? (
                      recentExpenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.subject || "No Subject"}</td>
                          <td>{expense.employee || "Unknown Employee"}</td>
                          <td>{expense.merchant || "Unknown Merchant"}</td>
                          <td>{`${expense.currency || "USD"} ${expense.total || "0.00"}`}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No recent expenses found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Access Section */}
            <div className={styles.accessContainer}>
              <h3>Quick Access</h3>
              <div className={styles.quickAccess}>
                <button className={styles.quickAccessButton} onClick={() => setActiveForm("newExpense")}>
                  <div className={styles.quickAccessIcon1}>
                    <IoMdCard />
                  </div>{" "}
                  + New Expense
                </button>
                <button className={styles.quickAccessButton}>
                  <div className={styles.quickAccessIcon2}>
                    <IoIosAlert />
                  </div>{" "}
                  + Add Receipt
                </button>
                <button className={styles.quickAccessButton}>
                  <div className={styles.quickAccessIcon3}>
                    <BiSolidReport />
                  </div>{" "}
                  + Create Report
                </button>
                <button className={styles.quickAccessButton} onClick={() => setActiveForm("newTrip")}>
                  <div className={styles.quickAccessIcon4}>
                    <IoMdAirplane />
                  </div>{" "}
                  + Create Trip
                </button>
              </div>
            </div>

            {/* Charts Section */}
            <div className={styles.reports}>
              <h3>Monthly Report</h3>
              <div className={styles.charts}>
                <div className={styles.chart}>
                  <h4>Team Spending Trend</h4>
                  <Bar data={chartData} options={chartOptions} />
                </div>
                <div className={styles.chart}>
                  <h4>Day-to-Day Expenses</h4>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
