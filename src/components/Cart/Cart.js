import "./Cart.css";
import { useContext } from "react";
import { useState } from "react";
import cartContext from "../../context/cartContext";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { quantity, cartProducts, setCartProducts } = useContext(cartContext);
  if (cartProducts.length > 0) {
    for (let i = 0; i < cartProducts.length; i++) {
      return (
        <div>
          <h3 style={{ color: "red" }}>Cart</h3>
          <h3 style={{ color: "red" }}>{("Quantity:", quantity)}</h3>
          <span style={{ color: "red" }}>
            {("cartProducts:", cartProducts[i].title)}
          </span>
          <span style={{ color: "red" }}>
            {("cartProducts:", cartProducts[i].price)}
          </span>
          <span style={{ color: "red" }}>
            {("cartProducts:", cartProducts[i].image)}
          </span>
        </div>
      );
    }
  }
};

export default Cart;
