import React, { useState } from "react";
import "./LoginPage.css";
import { auth } from "./../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // STATE
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);
  const [logInSuccess, setLogInSuccess] = useState<string | null>(null);
  const [logOutSuccess, setLogOutSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const doSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Typing for TypeScript
    const target = e.target as typeof e.target & {
      signUpEmail: { value: string };
      signUpPassword: { value: string };
    };

    const email = target.signUpEmail.value;
    const password = target.signUpPassword.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}`);
      });
  };

  const doLogIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      userEmail: { value: string };
      userPassword: { value: string };
    };
    const email = target.userEmail.value;
    const password = target.userPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLogInSuccess(`Successfully logged in as: ${userCredential.user.email}.`);
        navigate("/");
      })
      .catch((error) => {
        setLogInSuccess(`There was an error signing in: ${error.message}.`);
      });
  };

  const doLogOut = () => {
    signOut(auth)
      .then(() => {
        setLogOutSuccess(`You have signed out.`);
        navigate("/");
      })
      .catch((error) => {
        setLogOutSuccess(`There was an error signing out: ${error.message}`);
      });
  };

  // Is user logged in?
  const isAuthorized = auth.currentUser ? true : false;

  return (
    <section className="login-content">
      {!isAuthorized ? (
        <>
          <div className="signup">
            <h1>Sign Up</h1>
            {signUpSuccess}
            <form onSubmit={doSignUp}>
              <input type="text" name="signUpEmail" placeholder="User Email" />
              <input type="password" name="signUpPassword" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="login">
            <h1>Log In</h1>
            {logInSuccess}
            <form onSubmit={doLogIn}>
              <input type="text" name="userEmail" placeholder="User Email" />
              <input type="password" name="userPassword" placeholder="Password" />
              <button type="submit">Log In</button>
            </form>
          </div>
        </>
      ) : (
        <div className="logout">
          <h1>Log Out</h1>
          {logOutSuccess}
          <br />
          <button onClick={doLogOut}>Log Out</button>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
