import React, { useEffect } from "react";
import "./Product.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useStateValue } from "../Context/StateContextProvider";
import AOS from "aos";
import "aos/dist/aos.css";
function Product({ id, title, image, price, rating }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div data-aos="fade-in" className="product">
      <div className="product-info">
        <p className="product-desc">{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return (
                <p>
                  <i className="fas fa-star"></i>
                </p>
              );
            })}
        </div>
      </div>
      <img className="product-image" src={image} alt="" />
      <button onClick={addToBasket} className="product-button">
        Add To Cart
      </button>
    </div>
  );
}

export default Product;
