import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import "./Cart.css";
import { useState } from "react";

const Cart = () => {
  const { itemsInCart, updateCartItem, totalPrice, cartItem, qtty, setQtty } =
    useContext(cartContext);
  // const { image, title, price } = product;
  return itemsInCart.length > 0 ? (
    itemsInCart.map(({ product, quantity, note }, index) => (
      <>
        <Card key={index} sx={{ maxWidth: "150px" }}>
          <CardMedia
            sx={{ maxWidth: "15px" }}
            component="img"
            image={product.image}
          />

          <CardContent>
            <Typography>
              <span className="cart">{product.title}</span>
            </Typography>
            <br />
            <Typography>
              <span className="cart">Price: {product.price}$</span>
            </Typography>
          </CardContent>
          <button
            width={"15%"}
            onClick={() => {
              updateCartItem(index, product, quantity - 1, cartItem?.note);

              totalPrice();
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
              totalPrice();
            }}
          />
          <button
            onClick={() => {
              updateCartItem(index, product, ++quantity, cartItem?.note);

              totalPrice();
            }}
          >
            +
          </button>
        </Card>
      </>
    ))
  ) : (
    <div>
      <p>Your cart is empty...</p>
    </div>
  );
};

export default Cart;
