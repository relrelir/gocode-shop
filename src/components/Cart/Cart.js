import { useContext, useEffect } from "react";
import cartContext from "../../context/cartContext";
import "./Cart.css";

const Cart = () => {
  const {
    itemsInCart,
    updateCartItem,
    cartTotal,

    total,
    cartItem,
  } = useContext(cartContext);

  return itemsInCart.length > 0 ? (
    itemsInCart.map(({ product, quantity, note }, index) => (
      <div key={index} className="cart-container">
        <img img={"10%"} cart-image="cart-image" src={product.image} />

        <button
          onClick={() => {
            updateCartItem(index, product, quantity - 1, cartItem?.note);
            total();
          }}
        >
          -
        </button>
        <input
          size={1}
          value={quantity}
          onChange={(event) => {
            updateCartItem(index, product, event.target.value, cartItem?.note);
            total();
          }}
        />
        <button
          onClick={() => {
            updateCartItem(index, product, ++quantity, cartItem?.note);
            total();
          }}
        >
          +
        </button>
        <span className="cart">{product.title}</span>
        <span className="cart">Price:{product.price}</span>
      </div>
    ))
  ) : (
    <div>
      <p>Your cart is empty...</p>
    </div>
  );
};

export default Cart;
