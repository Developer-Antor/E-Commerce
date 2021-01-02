import React, { useState } from "react";
import { auth } from "../Firebase/Firebase";
import "./Login.css";
import { useStateValue } from "../Context/StateContextProvider";
import { Link, useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((auth) => {
        history.push("/");
        setPass("");
        setEmail("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const register = (e) => {
    const username = prompt("Please Give Your User Name:");

    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((auth) => {
        auth.user.updateProfile({
          displayName: username,
        });
        console.log(auth.user);
        if (auth) {
          history.push("/");
        }
        setPass("");
        setEmail("");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-container-link">
          <input
            className="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            value={pass}
            className="login-pass"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
        </div>

        <div className="create-account-link">
          <a onClick={register} href="">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
