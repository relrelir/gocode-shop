import { Rating } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../context/cartContext";
import "./Product.css";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";

import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

const Product = (product) => {
  let { id, price, title, image, rate } = product;
  const { itemsInCart, updateCartItem, total } = useContext(cartContext);

  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);

  let cartItem = itemsInCart[index];

  let quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        action={<IconButton aria-label="settings"></IconButton>}
      />
      <Link to={`/products/${id}`}>
        <img src={image} width={"50%"} />
        <p>Show details</p>
      </Link>

      <div className="product-info">
        <h6 price={price}>{price} $</h6>
        <Rating name="read-only" value={rate} readOnly size={"large"} />
        <br />
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
      </div>
    </Card>
  );
};

export default Product;
