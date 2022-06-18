import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { Drawer, box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Cart.css";
import { useState } from "react";

const Cart = () => {
  const { itemsInCart, updateCartItem, total, cartItem } =
    useContext(cartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return itemsInCart.length > 0 ? (
    itemsInCart.map(({ product, quantity, note }, index) => (
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(true)}
      >
        <box
          padding={2}
          width={"250px"}
          textAlign={"center"}
          role={"presentation"}
        >
          <Typography variant="h6" component="div">
            {" "}
            Your Cart:{" "}
          </Typography>
          <img width={"15%"} cart-image="cart-image" src={product.image} />

          <button
            width={"15%"}
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
              updateCartItem(
                index,
                product,
                event.target.value,
                cartItem?.note
              );
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
          <span className="cart">Price: {product.price}$</span>
        </box>
      </Drawer>
    ))
  ) : (
    <div>
      <p>Your cart is empty...</p>
    </div>
  );
};

export default Cart;
