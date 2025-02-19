// import React, { useState } from "react";
// import styles from "./Trips.module.css";
// import NewTrip from "../NewTrip/NewTrip"; // Import NewTrip component

// const tripsData = [
//   {
//     date: "08/11/2022",
//     destination: "Copenhagen",
//     movie: "Business Trip",
//     amount: "€1000.00",
//     report: "November_2022",
//     status: "Approved",
//   },
//   {
//     date: "10/11/2022",
//     destination: "London",
//     movie: "Client Pitch",
//     amount: "€850.00",
//     report: "November_2022",
//     status: "Pending",
//   },
//   {
//     date: "11/11/2022",
//     destination: "Brussels",
//     movie: "Client Pitch",
//     amount: "€1500.00",
//     report: "November_2022",
//     status: "Approved",
//   },
//   {
//     date: "11/11/2022",
//     destination: "Barcelona",
//     movie: "Conference",
//     amount: "€2000.00",
//     report: "November_2022",
//     status: "Approved",
//   },
//   {
//     date: "12/11/2022",
//     destination: "Hamburg",
//     movie: "Business Trip",
//     amount: "€980.00",
//     report: "November_2022",
//     status: "Not Approved",
//   },
// ];

// const statusClasses = {
//   Approved: styles.approved,
//   Pending: styles.pending,
//   "Not Approved": styles.notApproved,
// };

// const Trips = () => {
//   const [openForm, setOpenForm] = useState(false); 

//   const toggleForm = () => {
//     setOpenForm(true);
//   };

//   const closeForm = () => {
//     setOpenForm(false);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h1>Trips</h1>
//           <button className={styles.newTripButton} onClick={toggleForm}>
//             + New Trip
//           </button>
//         </div>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Details</th>
//               <th>Movie</th>
//               <th>Amount</th>
//               <th>Report</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tripsData.map((trip, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className={styles.details}>
//                     <input type="checkbox" />
//                     <div>
//                       <p>{trip.date}</p>
//                       <p className={styles.destination}>{trip.destination}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{trip.movie}</td>
//                 <td>{trip.amount}</td>
//                 <td>{trip.report}</td>
//                 <td>
//                   <span
//                     className={`${styles.status} ${statusClasses[trip.status]}`}
//                   >
//                     {trip.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Render NewTrip component conditionally */}
//         {openForm && <NewTrip CloseForm={closeForm} />}
//       </div>
//     </div>
//   );
// };

// export default Trips;




import React, { useState, useEffect } from "react";
import styles from "./Trips.module.css";
import NewTrip from "../NewTrip/NewTrip"; // Import NewTrip component
import { db } from "../../firebase"; // Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const statusClasses = {
  international: styles.approved, // For international trips, mark as approved
  domestic: styles.notApproved,   // For domestic trips, mark as not approved (you can modify the logic)
};

const Trips = () => {
  const [tripsData, setTripsData] = useState([]); // State to store trips data from Firestore
  const [openForm, setOpenForm] = useState(false);

  // Function to convert Firestore Timestamp to a human-readable date
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      const date = timestamp.toDate(); // Convert to JavaScript Date
      return date.toLocaleDateString(); // Return a formatted date string
    }
    return timestamp || ''; // Handle if timestamp is already a string
  };

  // Fetch data from Firestore
  const fetchTripsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trips"));
      const tripsArray = [];
      querySnapshot.forEach((doc) => {
        tripsArray.push({ id: doc.id, ...doc.data() });
      });
      setTripsData(tripsArray); // Store the fetched data in state
    } catch (error) {
      console.error("Error getting trips data: ", error);
    }
  };

  // Fetch trips data when the component mounts
  useEffect(() => {
    fetchTripsData();
  }, []);

  // Placeholder data for testing
  const placeholderData = [
    {
      id: "1",
      budget: "5000",
      checkIn: "2024-12-17",
      checkOut: "2024-12-24",
      createdAt: { toDate: () => new Date("2024-12-07T13:06:28Z") },
      depart: "Dubai",
      departDate: "2024-12-16",
      destination: "Dubai",
      flight: "roundtrip",
      hotel: "Burj Khalifa",
      name: "Mobeen",
      purpose: "Trip to Dubai",
      returnDate: "2024-12-25",
      type: "international",
      currency: "USD",
    },
    {
      id: "2",
      budget: "3000",
      checkIn: "2024-11-10",
      checkOut: "2024-11-15",
      createdAt: { toDate: () => new Date("2024-11-01T10:00:00Z") },
      depart: "New York",
      departDate: "2024-11-09",
      destination: "Los Angeles",
      flight: "one-way",
      hotel: "Hilton",
      name: "John",
      purpose: "Business Conference",
      returnDate: "2024-11-16",
      type: "domestic",
      currency: "USD",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Trips</h1>
          <button className={styles.newTripButton} onClick={() => setOpenForm(true)}>
            + New Trip
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Details</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Report</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(tripsData.length > 0 ? tripsData : placeholderData).map((trip) => (
              <tr key={trip.id}>
                <td>
                  <div className={styles.details}>
                    <p>
                      {trip.departDate} - {trip.depart}
                    </p>
                    <p className={styles.destination}>{trip.destination}</p>
                  </div>
                </td>
                <td>{trip.purpose}</td>
                <td>{`${trip.currency} ${trip.budget}`}</td>
                <td>{formatDate(trip.createdAt)}</td>
                <td>
                  <span className={`${styles.status} ${statusClasses[trip.type]}`}>
                    {trip.type === "international" ? "Complete" : "Not Complete"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Render NewTrip component conditionally */}
        {openForm && <NewTrip CloseForm={() => setOpenForm(false)} />}
      </div>
    </div>
  );
};

export default Trips;
