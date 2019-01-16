import React from "react";

import "./Login.css";

const Login = ({ onLogin, loginError }) => {
  const emailRef = React.createRef();
  const passRef = React.createRef();

  const verifyInputUI = () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    if(email && pass) {
      onLogin(email, pass);
       emailRef.current.value = "";
       passRef.current.value = "";
      emailRef.current.focus();
    } else {
      emailRef.current.focus()
    }
  };

  return (
    <div className="form-signin">
      <h1>Login</h1>
      <div className="form">
        <span>Email: </span>
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          style={loginError ? {border: '1px solid red', outline: 'none'}: null}
        />
        <br />
        <span>Password: </span>
        <input
          ref={passRef}
          type="password"
          placeholder="Password"
          style={loginError ? {border: '1px solid red', outline: 'none'}: null}
        />
        <div className="loginButton" onClick={verifyInputUI}>
          Login
        </div>
        {loginError ? (
          <p style={{ color: "red", justifyContent: "center" }}>{loginError}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
