import React from "react";
import styles from "./Approvals.module.css";
// Icons 
import { FaCheck } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const approvalsData = [
    {
        owner: "Samson Zap",
        role: "Engineer",
        category: "Travel",
        amount: "€780.00",
        frequency: "Once",
    },
    {
        owner: "Jessica Bowers",
        role: "Designer",
        category: "Travel",
        amount: "€430.00",
        frequency: "Once",
    },
    {
        owner: "John Wilson",
        role: "Account Executive",
        category: "Food",
        amount: "€95.50",
        frequency: "Monthly",
    },
    {
        owner: "Hannah Gomez",
        role: "Product Manager",
        category: "Travel",
        amount: "€560.00",
        frequency: "Monthly",
    },
    {
        owner: "Laura Polis",
        role: "Designer",
        category: "Software",
        amount: "€120.00",
        frequency: "Bi-Monthly",
    },
    {
        owner: "Barbara Jones",
        role: "Strategist",
        category: "Software",
        amount: "€275.75",
        frequency: "Bi-Monthly",
    },
    {
        owner: "Zach Moss",
        role: "Engineer",
        category: "Travel",
        amount: "€30.00",
        frequency: "Monthly",
    },
];

const Approvals = () => {
    return (
        <div className={styles.container}>
            {/* <Sidebar /> */}
            <table className={styles.table}>
                <thead>
                    <h1 className={styles.title}>Approvals</h1>
                    <tr>
                        <th>Owner</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Frequency</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {approvalsData.map((approval, index) => (
                        <tr key={index}>
                            <td>
                                <div className={styles.owner}>
                                    <div className={styles.avatar}></div>
                                    <div>
                                        <p className={styles.ownerName}>{approval.owner}</p>
                                        <p className={styles.ownerRole}>{approval.role}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span
                                    className={`${styles.category} ${styles[approval.category.toLowerCase()]
                                        }`}
                                >
                                    {approval.category}
                                </span>
                            </td>
                            <td>{approval.amount}</td>
                            <td>{approval.frequency}</td>
                            <td>
                                <div className={styles.actions}>
                                    <button className={styles.viewButton}><FaRegEye /></button>
                                    <button className={styles.approveButton}><FaCheck /></button>
                                    <button className={styles.rejectButton}><RxCross2 /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Approvals;
