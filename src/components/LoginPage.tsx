import React from "react";

const LoginPage = () => {
  return (
    <React.Fragment>
      <h1>Login Placeholder</h1>
      <form>
        <input type="text" name="userEmail" placeholder="User Email" />
        <input type="password" name="userPassword" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
