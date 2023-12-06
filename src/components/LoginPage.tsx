import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  // STATE
  // const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  // const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);
  // const [signOutSuccess, setSignOutSuccess] useState<string | null>(null);

  const doSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // console.log(e);
    // let signUpEmail = e.target[0].value;

    const target = e.target as typeof e.target & {
      signUpEmail: { value: string };
      signUpPassword: { value: string };
    };

    // console.log("target is:");
    // console.log(target);
    // console.log(e);
    // console.log(target.signUpEmail);
    // console.log("target.signUpEmail:");
    // console.log(target.signUpEmail);
    // console.log(typeof target.signUpEmail);

    const email = target.signUpEmail.value;
    const password = target.signUpPassword.value;
  };

  const doLogIn = () => {};

  const doSignOut = () => {};

  return (
    <section className="login-content">
      <h1>Login</h1>
      <form onSubmit={doLogIn}>
        <input type="text" name="userEmail" placeholder="User Email" />
        <input type="password" name="userPassword" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>

      <h1>Sign Up</h1>
      <form onSubmit={doSignUp}>
        <input type="text" name="signUpEmail" placeholder="User Email" />
        <input type="password" name="signUpPassword" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>

      <h1>Sign Out</h1>
      <br />
      <button onClick={doSignOut}>Sign Out</button>
    </section>
  );
};

export default LoginPage;
