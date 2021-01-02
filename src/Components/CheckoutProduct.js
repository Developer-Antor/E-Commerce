import React from "react";
import { useStateValue } from "../Context/StateContextProvider";

function CheckoutProduct({ id, title, price, rating, image }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div>
      <div className="checkout-product">
        <div className="checkout-product-info">
          <div className="checkout-product-title">{title}</div>
          <div className="checkout-product-price">
            $<span>{price}</span>
          </div>
          <div className="checkout-product-rating">
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

        <img src={image} className="checkout-product-img"></img>
        <button onClick={removeFromBasket} className="checkout-product-button">
          Remove Item
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
