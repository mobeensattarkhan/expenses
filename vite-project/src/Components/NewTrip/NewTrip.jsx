import React, { useState } from "react";
import { db } from "../../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Firestore functions for adding data
import styles from "./NewTrip.module.css"; // Your custom CSS styles

const NewTrip = ({ CloseForm }) => {
  // Declare state variables for each form field
  const [name, setName] = useState("");
  const [type, setType] = useState("domestic");
  const [purpose, setPurpose] = useState("");
  const [flight, setFlight] = useState("one-way");
  const [depart, setDepart] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [destination, setDestination] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [budget, setBudget] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hotel, setHotel] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Add the trip data to Firestore
      await addDoc(collection(db, "trips"), {
        name,
        type,
        purpose,
        flight,
        depart,
        departDate,
        destination,
        returnDate,
        budget,
        checkIn,
        checkOut,
        hotel,
        createdAt: new Date(), // Save the current date/time
      });
      alert("Trip added successfully!"); // Notify the user
      resetForm(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error adding document: ", error); // Log errors to the console
      alert("Error adding trip: " + error.message); // Notify the user of errors
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setName("");
    setType("domestic");
    setPurpose("");
    setFlight("one-way");
    setDepart("");
    setDepartDate("");
    setDestination("");
    setReturnDate("");
    setBudget("");
    setCheckIn("");
    setCheckOut("");
    setHotel("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>New Trip</h2>
        <button onClick={CloseForm} className={styles.closeButton}>
          &times;
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div className={styles.radioGroup}>
            <label>Type*</label>
            <label>
              <input
                type="radio"
                name="type"
                value="domestic"
                checked={type === "domestic"}
                onChange={(e) => setType(e.target.value)}
              />{" "}
              Domestic
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="international"
                checked={type === "international"}
                onChange={(e) => setType(e.target.value)}
              />{" "}
              International
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="purpose">Purpose*</label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter purpose"
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Itinerary</h3>
          <div className={styles.subSection}>
            <h4>Flight</h4>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="flight"
                  value="one-way"
                  checked={flight === "one-way"}
                  onChange={(e) => setFlight(e.target.value)}
                />{" "}
                One-way
              </label>
              <label>
                <input
                  type="radio"
                  name="flight"
                  value="roundtrip"
                  checked={flight === "roundtrip"}
                  onChange={(e) => setFlight(e.target.value)}
                />{" "}
                Roundtrip
              </label>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="depart">Depart from*</label>
                <input
                  type="text"
                  id="depart"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  placeholder="Enter departure location"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="departDate">Date</label>
                <input
                  type="date"
                  id="departDate"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="destination">Destination*</label>
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="returnDate">Date</label>
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="budget">Budget limit*</label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter budget limit"
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Accommodation</h4>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="checkIn">Check-in*</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="checkOut">Check-out*</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="hotel">Hotel*</label>
            <input
              type="text"
              id="hotel"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              placeholder="Enter hotel name"
            />
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

export default NewTrip;
