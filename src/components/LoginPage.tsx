import React from "react";

const LoginPage = () => {
  return (
    <React.Fragment>
      <h1>Login Placeholder</h1>
      <form>
        <input type="text" name="userName" placeholder="User Name" />
        <input type="text" name="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </React.Fragment>
  );
};

export default LoginPage;
