import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AuthForm.module.css"; 

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Sign-up successful! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sign-in successful! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      navigate("/dashboard"); 
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
    <div className={styles.authPage}>



    <div className={styles.authContainer}>
      <div className={styles.logo}>EXPENSIO</div>
      <input
        className={styles.authInput}
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.authInput}
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.authButton} onClick={handleAuth}>
        {isSignUp ? "Sign Up" : "Start"}
      </button>
      <div className={styles.authToggle} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </div>
      <ToastContainer />

    </div>
    </div>
    </>
  );
};

export default AuthForm;
