import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdRoofing, MdOutlineAddCard } from "react-icons/md";
import { IoMdCard } from "react-icons/io";
import { GiAirplaneDeparture, GiSettingsKnobs } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("/dashboard"); // Default active menu
  const {logout}  = useAuth()

  const handleMenuClick = (menuPath) => {
    setActiveMenu(menuPath);
  };

  

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src="/user.jpg" alt="User" className={styles.profileImage} />
        <h3 className={styles.profileName}>Janice Chandler</h3>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <Link
            to="/dashboard"
            className={`${styles.menuLink} ${activeMenu === "/dashboard" ? styles.active : ""
              }`}
            onClick={() => handleMenuClick("/dashboard")}
          >
            <li className={styles.menuItem}>
              <MdRoofing className={styles.icon} />
              Home
            </li>
          </Link>
          <Link
            to="/expenses"
            className={`${styles.menuLink} ${activeMenu === "/expenses" ? styles.active : ""
              }`}
            onClick={() => handleMenuClick("/expenses")}
          >
            <li className={styles.menuItem}>
              <IoMdCard className={styles.icon} />
              Expenses
            </li>
          </Link>
          <Link
            to="/trips"
            className={`${styles.menuLink} ${activeMenu === "/trips" ? styles.active : ""
              }`}
            onClick={() => handleMenuClick("/trips")}
          >
            <li className={styles.menuItem}>
              <GiAirplaneDeparture className={styles.icon} />
              Trips
            </li>
          </Link>
          {/* <Link
            to="/approvals"
            className={`${styles.menuLink} ${activeMenu === "/approvals" ? styles.active : ""
              }`}
            onClick={() => handleMenuClick("/approvals")}
          >
            <li className={styles.menuItem}>
              <MdOutlineAddCard className={styles.icon} />
              Approvals
            </li>
          </Link> */}
          <li className={styles.menuItem}>
            <GiSettingsKnobs className={styles.icon} />
            Settings
          </li>
          <li className={styles.menuItem}>
            <FaPhone className={styles.icon} />
            Support
          </li>
          <li className={styles.menuItem} onClick={logout}>
            <IoIosLogOut className={styles.icon} />
            Log Out
          </li>
        </ul>
      </nav>
      <div className={styles.logoImg}>
        <h1 className={styles.logoText}>Expensio</h1>
      </div>
    </aside>
  );
};

export default Sidebar;



