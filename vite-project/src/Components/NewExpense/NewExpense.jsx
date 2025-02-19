import React, { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions for adding data
import styles from "./NewExpense.module.css"; // Your custom CSS styles

const NewExpense = ({ CloseForm }) => {
  // Declare state variables for each form field
  const [subject, setSubject] = useState("");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [reimbursable, setReimbursable] = useState(false);
  const [category, setCategory] = useState("travel");
  const [description, setDescription] = useState("");
  const [employee, setEmployee] = useState("");
  const [addToReport, setAddToReport] = useState("no");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Add the expense data to Firestore
      await addDoc(collection(db, "expenses"), {
        subject,
        merchant,
        date,
        total,
        currency,
        reimbursable,
        category,
        description,
        employee,
        addToReport,
        createdAt: new Date(), // Save the current date/time
      });
      alert("Expense added successfully!"); // Notify the user
      resetForm(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error adding document: ", error); // Log errors to the console
      alert("Error adding expense: " + error.message); // Notify the user of errors
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setSubject("");
    setMerchant("");
    setDate("");
    setTotal("");
    setCurrency("USD");
    setReimbursable(false);
    setCategory("travel");
    setDescription("");
    setEmployee("");
    setAddToReport("no");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>New Expense</h2>
        <button onClick={CloseForm} className={styles.closeButton}>
          &times;
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formLeft}>
          <div className={styles.inputGroup}>
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="merchant">Merchant*</label>
            <input
              type="text"
              id="merchant"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Enter merchant"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="date">Date*</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="total">Total*</label>
              <input
                type="number"
                id="total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="reimbursable"
              checked={reimbursable}
              onChange={(e) => setReimbursable(e.target.checked)}
            />
            <label htmlFor="reimbursable">Reimbursable</label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="3"
            ></textarea>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="employee">Employee*</label>
            <input
              type="text"
              id="employee"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              placeholder="Enter employee name"
            />
          </div>
          <div className={styles.row}>
            <label>Add to report</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="addToReport"
                  value="yes"
                  checked={addToReport === "yes"}
                  onChange={(e) => setAddToReport(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="addToReport"
                  value="no"
                  checked={addToReport === "no"}
                  onChange={(e) => setAddToReport(e.target.value)}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.draftButton}>
            Save draft
          </button>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewExpense;
