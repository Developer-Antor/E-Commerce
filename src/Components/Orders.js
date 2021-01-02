import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateContextProvider";
import { db } from "../Firebase/Firebase";
import "./Orders.css";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    db.collection("orders")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => {
            if (user.uid === doc.data().uid) {
              return doc.data();
            }
          })
        );
        const filtered = orders.filter((el) => {
          return el != null;
        });

        setOrders(filtered);
        setLoad(true);
      });
  }, [orders]);

  const html = () => (
    <div className="orders">
      <div className="orders-container">
        {orders.map((order) => {
          return (
            <div className="order">
              <div className="order-address">
                <h2>Address 📢 : {order?.address}</h2>
              </div>
              <div className="order-products">
                <h2>Items You Ordered 🔥 : {order?.items}</h2>
              </div>
              <div className="order-payment">
                <h2>Total Amount 💵 : {order?.total}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return <div>{load ? html() : <h1>🎤Loading🔥🔥🔥</h1>}</div>;
}

export default Orders;
