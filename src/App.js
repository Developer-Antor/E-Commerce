import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Authentication/Login";
import { useEffect } from "react";
import { auth } from "./Firebase/Firebase";
import { useStateValue } from "./Context/StateContextProvider";
import Payment from "./Components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Admin from "./Admin/Admin";
import Footer from "./Components/Footer";
import NotAdmin from "./Admin/NotAdmin";
import Orders from "./Components/Orders";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const promise = loadStripe(
    "pk_test_51I45ZkC5uekWT6ilv6aS0ABMeSlrc5yAwVNd55JW09BBJ7pHC8EWMLKB4S7o9CQndbdATDYKK0DfNb7ObujPTeMP00w85XZTHt"
  );

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("USER", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
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
          <Elements stripe={promise}>
            <Payment />
          </Elements>
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
}

export default App;
