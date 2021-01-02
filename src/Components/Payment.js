import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "../Context/Reducer";
import { useStateValue } from "../Context/StateContextProvider";
import { db } from "../Firebase/Firebase";

import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";

function Payment() {
  const date = Date.now();
  const [{ user, basket, isNewOrder }, dispatch] = useStateValue(0);
  const [address, setAddress] = useState("");
  const history = useHistory();

  const selectAddress = () => {
    let address = prompt("Please Give Your Address");
    if (address) {
      setAddress(address);
    }
  };

  console.log(date);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null && address != null && basket.length !== 0) {
      db.collection("orders")
        .add({
          timestamp: date,
          uid: user.uid,
          address: address,
          items: basket.length,
          total: getBasketTotal(basket),
        })
        .then(() => {
          alert("Order Added");
          history.push("/orders");
        });
    } else {
      if (address === "") {
        alert("Please Give Address");
      } else if (user == null) {
        alert("Signin To Pay");
      } else {
        alert("Please Add Product");
      }
    }
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length}</Link> Items
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h1>Delivery Address🚀</h1>{" "}
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>{address}</p>
            <button onClick={selectAddress} className="address-button">
              {address ? "Change Address" : "Select Address"}
            </button>
          </div>
        </div>
        <div className="payment-item">
          {basket.map((item) => {
            return (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            );
          })}
        </div>
        <div className=" details payment-section">
          <div className="payment-title">
            <h1>Payment Method 💵 </h1>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit} action="">
              <button type="submit">Pay ${getBasketTotal(basket)}🔥</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
