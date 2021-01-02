import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Authentication/Login";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/Firebase";
import { useStateValue } from "./Context/StateContextProvider";
import Payment from "./Components/Payment";

import Admin from "./Admin/Admin";

import NotAdmin from "./Admin/NotAdmin";
import Orders from "./Components/Orders";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("USER", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setLoad(false);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setLoad(false);
      }
    });
  }, []);

  const body = () => (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/admin">
          {user?.uid !== "DHq57sXeDLWxE58J7VZRDM1WDHj1" ? (
            <NotAdmin />
          ) : (
            <Admin />
          )}
        </Route>
        <Route path="/orders">
          {user ? <Orders /> : <h1>You Have To Signin To See Orders</h1>}
        </Route>
      </div>
    </Router>
  );

  return <div>{load ? <h1>Loading...</h1> : body()}</div>;
}

export default App;
