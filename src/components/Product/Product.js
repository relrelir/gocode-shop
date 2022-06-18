import { useContext } from "react";
import cartContext from "../../context/cartContext";
import "./Product.css";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const Product = (product) => {
  const { itemsInCart, updateCartItem, total } = useContext(cartContext);
  let { id, price, title, image, rate } = product;

  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);

  let cartItem = itemsInCart[index];

  let quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card sx={{ maxWidth: 350 }} raised={true}>
      <CardMedia component="img" src={image} width={"50%"} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Share</Button>
        <Button size="large">
          <Link to={`/products/${id}`}>
            <p>Show details</p>
          </Link>
        </Button>
        <br />
        <Button
          size="large"
          onClick={() => {
            updateCartItem(index, product, quantity - 1, cartItem?.note);
            total();
          }}
        >
          -
        </Button>
        <input
          size={1}
          value={quantity}
          onChange={(event) => {
            updateCartItem(index, product, event.target.value, cartItem?.note);
            total();
          }}
        />
        <Button
          size="large"
          onClick={() => {
            updateCartItem(index, product, ++quantity, cartItem?.note);
            total();
          }}
        >
          +
        </Button>
      </CardActions>
    </Card>
  );
};

//       <CardHeader
//         title={title}
//         action={<IconButton aria-label="settings"></IconButton>}
//       />
//       <Link to={`/products/${id}`}>
//         <img src={image} width={"50%"} />
//         <p>Show details</p>
//       </Link>

//       <div className="product-info">
//         <h6 price={price}>{price} $</h6>
//         <Rating name="read-only" value={rate} readOnly size={"large"} />
//         <br />
//         <button
//           onClick={() => {
//             updateCartItem(index, product, quantity - 1, cartItem?.note);
//             total();
//           }}
//         >
//           -
//         </button>
//         <input
//           size={1}
//           value={quantity}
//           onChange={(event) => {
//             updateCartItem(index, product, event.target.value, cartItem?.note);
//             total();
//           }}
//         />
//         <button
//           onClick={() => {
//             updateCartItem(index, product, ++quantity, cartItem?.note);
//             total();
//           }}
//         >
//           +
//         </button>
//       </div>
//     </Card>
//   );
// };

// return (
//   <Card sx={{ maxWidth: 500 }}>
//     <CardHeader
//       title={title}
//       action={<IconButton aria-label="settings"></IconButton>}
//     />
//     <Link to={`/products/${id}`}>
//       <img src={image} width={"50%"} />
//       <p>Show details</p>
//     </Link>

//     <div className="product-info">
//       <h6 price={price}>{price} $</h6>
//       <Rating name="read-only" value={rate} readOnly size={"large"} />
//       <br />
//       <button
//         onClick={() => {
//           updateCartItem(index, product, quantity - 1, cartItem?.note);
//           total();
//         }}
//       >
//         -
//       </button>
//       <input
//         size={1}
//         value={quantity}
//         onChange={(event) => {
//           updateCartItem(index, product, event.target.value, cartItem?.note);
//           total();
//         }}
//       />
//       <button
//         onClick={() => {
//           updateCartItem(index, product, ++quantity, cartItem?.note);
//           total();
//         }}
//       >
//         +
//       </button>
//     </div>
//   </Card>
// );
// };

export default Product;
