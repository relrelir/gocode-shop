import { useContext, useState } from "react";
import cartContext from "../../context/cartContext";
import "./Product.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Paper,
  Rating,
} from "@mui/material";

const Product = (product) => {
  const { itemsInCart, updateCartItem, totalPrice, qtty, setQtty } =
    useContext(cartContext);
  let { id, price, title, image, rate, count, category } = product;

  // const [qtty, setQtty] = useState(null);
  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);

  let cartItem = itemsInCart[index];

  let quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card
      container
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <CardContent>
        <Link to={`/products/${id}`}>
          <Typography sx={{ margin: "3%" }} variant="h6">
            {title}
          </Typography>
          <br />
        </Link>
        <Grid
          container="true"
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          <CardMedia
            item="true"
            xs={6}
            xl={6}
            sx={{
              maxWidth: "50%",
              margin: "2%",
            }}
            component="img"
            src={image}
          />
          <>
            <Typography
              item="true"
              xs={6}
              xl={6}
              variant="h6"
              color="text.secondary"
            >
              {category}
              <br />$ {price.toString().includes(`.`) ? price : `${price}.00`}
              <br />
              <Paper
                component="form"
                sx={{
                  margin: "5%",
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 153,
                }}
              >
                <IconButton
                  sx={{ p: "5px", color: "black", boxShadow: 1 }}
                  size="large"
                  onClick={() => {
                    updateCartItem(index, product, ++quantity, cartItem?.note);

                    totalPrice();
                  }}
                >
                  +
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="0"
                  value={quantity}
                />
                <IconButton
                  sx={{ p: "5px", color: "black", boxShadow: 1 }}
                  onClick={() => {
                    updateCartItem(index, product, --quantity, cartItem?.note);

                    totalPrice();
                  }}
                >
                  -
                </IconButton>
                <Divider sx={{ height: 50, m: 1 }} orientation="vertical" />
                <IconButton>
                  <ShoppingCartIcon
                    sx={{
                      boxShadow: 5,
                      color: "black",
                    }}
                    size="large"
                    onClick={() => {
                      updateCartItem(index, product, qtty, cartItem?.note);
                      totalPrice();
                    }}
                  />
                </IconButton>
              </Paper>
              <Rating
                name="half-rating-read"
                value={rate}
                precision={0.5}
                size={"large"}
                readOnly
              />
            </Typography>
          </>
        </Grid>
      </CardContent>
      <CardActions>
        {/* <Button
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
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default Product;
