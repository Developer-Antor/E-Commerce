import React, { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import "./Home.css";
import Product from "./Product";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("products").onSnapshot((snap) =>
      setProducts(snap.docs.map((doc) => doc.data()))
    );
  }, [products]);
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-row">
          {products != null ? (
            products.map((product) => (
              <Product
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                image={product.image}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
