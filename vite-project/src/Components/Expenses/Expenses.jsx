// import React, { useState } from "react";
// import styles from "../Expenses/Expenses.module.css";
// import NewExpense from "../NewExpense/NewExpense";

// const Expenses = () => {
//   const [selectedExpenses, setSelectedExpenses] = useState([]);
//   const [opneForm, setOpenForm] = useState(false)


//   function ToggleForm (){
//     setOpenForm(true)
//   }

//   function CloseForm (){
//     setOpenForm(false)
//   }

//   const expensesData = [
//     {
//       date: "09/11/2022",
//       details: "Food Catering",
//       merchant: "McFood",
//       amount: "€250.00",
//       report: "November_2022",
//       status: "Not Submitted",
//     },
//     {
//       date: "10/11/2022",
//       details: "Office Supplies",
//       merchant: "Officio",
//       amount: "€150.00",
//       report: "November_2022",
//       status: "Not Submitted",
//     },
//     {
//       date: "11/11/2022",
//       details: "Business Lunch",
//       merchant: "Restaurant",
//       amount: "€75.50",
//       report: "November_2022",
//       status: "Not Submitted",
//     },
//     {
//       date: "11/11/2022",
//       details: "Travel Expenses",
//       merchant: "Airlines",
//       amount: "€450.25",
//       report: "November_2022",
//       status: "Submitted",
//     },
//     {
//       date: "12/11/2022",
//       details: "Client Dinner",
//       merchant: "Bistro",
//       amount: "€120.00",
//       report: "November_2022",
//       status: "Not Submitted",
//     },
//     {
//       date: "14/11/2022",
//       details: "Accommodation",
//       merchant: "Hotel ***",
//       amount: "€275.75",
//       report: "November_2022",
//       status: "Submitted",
//     },
//     {
//       date: "20/11/2022",
//       details: "News Subscription",
//       merchant: "NewsTimes",
//       amount: "€30.00",
//       report: "November_2022",
//       status: "Not Submitted",
//     },
//   ];

//   // Handle checkbox selection
//   const handleCheckboxChange = (index) => {
//     if (selectedExpenses.includes(index)) {
//       setSelectedExpenses(selectedExpenses.filter((i) => i !== index));
//     } else {
//       setSelectedExpenses([...selectedExpenses, index]);
//     }
//     // -----btn newExpense
//   };




//   return (
//     <div className={styles.container}>
//       <div className={styles.expensesContent}>
//         <header className={styles.header}>
//           <h1 className={styles.title} >Expenses</h1>
//           <div className={styles.headerActions}>
//             <button className={styles.newExpenseBtn} onClick={ToggleForm}>+ New expense</button>
//             <button className={styles.filterBtn}>🔍</button>
//             <button className={styles.moreOptionsBtn}>⋮</button>
//           </div>
//         </header>
//         <table className={styles.expensesTable}>
//           <thead>
//             <tr>
//               <th>DETAILS</th>
//               <th>MERCHANT</th>
//               <th>AMOUNT</th>
//               <th>REPORT</th>
//               <th>STATUS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {expensesData.map((expense, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className={styles.inputBox}>
//                     <input
//                       type="checkbox"
//                       checked={selectedExpenses.includes(index)}
//                       onChange={() => handleCheckboxChange(index)}
//                       className={styles.checkboxInput}
//                     />
//                     {/* <div className={styles.expenseInfo}> */}
//                       <span className={styles.expenseDetails}>{expense.details}</span>
//                     {/* </div> */}
//                   </div>
//                 </td>
//                 <td>{expense.merchant}</td>
//                 <td>{expense.amount}</td>
//                 <td className="reports-column">{expense.report}
//                   <div className="report-date">
//                     <span className={styles.expenseDate}>{expense.date}</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span
//                     className={`${styles.statusBadge} ${expense.status === "Submitted"
//                         ? styles.submitted
//                         : styles.notSubmitted
//                       }`}
//                   >
//                     {expense.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {
//           opneForm && <NewExpense CloseForm={CloseForm}/>
//         }
      
//       </div>
//     </div>
//   );
// };

// export default Expenses;






import React, { useState, useEffect } from "react";
import styles from "../Expenses/Expenses.module.css";
import NewExpense from "../NewExpense/NewExpense";
import { db } from "../../firebase"; // Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const Expenses = () => {
  const [expensesData, setExpensesData] = useState([]); // State to store expenses data from Firestore
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  // Fetch data from Firestore
  const fetchExpensesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const expensesArray = [];
      querySnapshot.forEach((doc) => {
        expensesArray.push({ id: doc.id, ...doc.data() });
      });
      setExpensesData(expensesArray); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching expenses data: ", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchExpensesData();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    if (selectedExpenses.includes(index)) {
      setSelectedExpenses(selectedExpenses.filter((i) => i !== index));
    } else {
      setSelectedExpenses([...selectedExpenses, index]);
    }
  };

  // Toggle form visibility
  const toggleForm = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  // Format Firestore Timestamp to a readable date
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    }
    return "No Date";
  };

  return (
    <div className={styles.container}>
      <div className={styles.expensesContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Expenses</h1>
          <div className={styles.headerActions}>
            <button className={styles.newExpenseBtn} onClick={toggleForm}>
              + New Expense
            </button>
            <button className={styles.filterBtn}>🔍</button>
            <button className={styles.moreOptionsBtn}>⋮</button>
          </div>
        </header>

        <table className={styles.expensesTable}>
          <thead>
            <tr>
              <th>DETAILS</th>
              <th>MERCHANT</th>
              <th>AMOUNT</th>
              <th>REPORT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.length > 0 ? (
              expensesData.map((expense, index) => (
                <tr key={expense.id}>
                  <td>
                    <div className={styles.inputBox}>
                      <input
                        type="checkbox"
                        checked={selectedExpenses.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.expenseDetails}>
                        {expense.description || "No Details"}
                      </span>
                    </div>
                  </td>
                  <td>{expense.merchant || "Unknown Merchant"}</td>
                  <td>{`${expense.currency || "USD"} ${expense.total || "0.00"}`}</td>
                  <td>
                    {expense.addToReport === "yes" ? "Added to Report" : "No Report"}
                    <div className={styles.expenseDate}>
                      <span>{expense.date || formatDate(expense.createdAt)}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        expense.reimbursable ? styles.submitted : styles.notSubmitted
                      }`}
                    >
                      {expense.reimbursable ? "Reimbursable" : "Not Reimbursable"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No Expenses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {openForm && <NewExpense CloseForm={closeForm} />}
      </div>
    </div>
  );
};

export default Expenses;
