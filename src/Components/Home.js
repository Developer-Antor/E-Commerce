import React, { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import "./Home.css";
import Product from "./Product";
function Home() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    db.collection("products").onSnapshot((snap) => {
      setProducts(snap.docs.map((doc) => doc.data()));
      setLoad(false);
    });
  }, [products]);
  const body = () => (
    <div className="home">
      <div className="home-container">
        <div className="home-row">
          {products.map((product) => (
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
  return <div>{load ? <h1>Fire🔥 Loading...</h1> : body()}</div>;
}

export default Home;
