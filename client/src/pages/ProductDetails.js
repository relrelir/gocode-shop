import {
  Button,
  CardHeader,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header.js";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
import cartContext from "../context/cartContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { updateCartItem, itemsInCart, totalPrice } = useContext(cartContext);

  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);
  let cartItem = itemsInCart[index];
  let quantity = cartItem ? cartItem.quantity : 0;

  function fetchProductId() {
    setIsLoading(true);
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(() => product);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Request Failed", err);
      });
  }

  useEffect(() => {
    if (!product) {
      // if (products?.length) {
      //   setProduct(products.find((p) => p.id === productId));
      //   setIsLoading(false);
      // } else {
      fetchProductId();
      //   }
    } else {
      setIsLoading(false);
    }
  }, [productId]);

  return (
    <div>
      {/* <Header /> */}
      {isLoading ? (
        <LoadingSpinner />
      ) : product ? (
        <>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={product.title}
              subheader={product.category}
            />
            <CardMedia
              component="img"
              style={{ width: "30%" }}
              image={product.image}
            />
            <CardContent>
              <Typography variant="h5">{product.description}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price}
              </Typography>
            </CardContent>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating.rate}
              precision={0.5}
              readOnly
            />
            <br />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
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
                  updateCartItem(
                    index,
                    product,
                    event.target.value,
                    cartItem?.note
                  );
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
              {/* <Rating name="read-only" value={rate} readOnly /> */}
            </CardActions>
          </Card>
        </>
      ) : (
        <p>Oops some error!</p>
      )}
    </div>
  );
}
