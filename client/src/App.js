import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import CartContext from "./context/cartContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart/Cart";
import { Drawer, Grid, Typography } from "@mui/material";
import Footer from "./Footer/Footer";

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setprice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateCartItem = (index, product, quantity = 0, note = "") => {
    let cartItem = itemsInCart[index];

    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      if (quantity <= 0) {
        return;
      }
      cartItem = { product, quantity, note };
    }
    if (index === -1) {
      itemsInCart.push(cartItem);
    } else if (quantity <= 0) {
      itemsInCart.splice(index, 1);
    }
    return itemsInCart;
  };

  const totalPrice = () => {
    let price = 0;
    for (let i = 0; i < itemsInCart.length; i++) {
      console.log(itemsInCart[i].product.price);
      price += itemsInCart[i].product.price * itemsInCart[i].quantity;
    }
    setprice(+(Math.round(price + "e+2") + "e-2")); //מעגל עד 2 ספרות אחרי נקודה עשרונית
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          setIsCartOpen,
          isCartOpen,
          itemsInCart,
          setItemsInCart,
          products,
          setProducts,
          updateCartItem,
          price,
          totalPrice,
        }}
      >
        {" "}
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        >
          <Typography
            sx={{
              border: 3,
              background: "purple",
              boxShadow: 2,
            }}
            variant="h2"
            component="div"
          >
            Your Cart:
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            <Cart />
            <br />
          </Grid>
          <Typography
            sx={{
              border: 3,
              background: "pink",
              boxShadow: 2,
            }}
            variant="h3"
            component="div"
          >
            SUBTOTAL:
            <br /> {price} $
          </Typography>
        </Drawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </CartContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
