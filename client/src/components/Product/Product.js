import { useContext } from "react";
import cartContext from "../../context/cartContext";
import "./Product.css";
import { Link } from "react-router-dom";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Rating } from "@mui/material";

const Product = (product) => {
  const { itemsInCart, updateCartItem, totalPrice } = useContext(cartContext);
  let { id, price, title, image, rate, category } = product;

  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);

  let cartItem = itemsInCart[index];

  let quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card raised={true}>
      <CardMedia component="img" src={image} />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <br />
        <Typography variant="h6" color="text.secondary">
          {price}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          {category}
        </Typography>
        <br />
        <br />
        <Rating
          name="half-rating-read"
          value={rate}
          precision={0.5}
          size={"large"}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button size="large">Share</Button>

        <Button size="large" component={Link} to={`/products/${id}`}>
          <p>Show details</p>
        </Button>

        <Button
          size="large"
          onClick={() => {
            updateCartItem(index, product, quantity - 1, cartItem?.note);
            totalPrice();
          }}
        >
          -
        </Button>
        <input
          size={1}
          value={quantity}
          onChange={(event) => {
            updateCartItem(index, product, event.target.value, cartItem?.note);
            totalPrice();
          }}
        />
        <Button
          size="large"
          onClick={() => {
            updateCartItem(index, product, ++quantity, cartItem?.note);
            totalPrice();
          }}
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
