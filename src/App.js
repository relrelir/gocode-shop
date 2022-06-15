import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import CartContext from "./context/cartContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

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

  const total = () => {
    let cartTotal = 0;
    for (let i = 0; i < itemsInCart.length; i++) {
      console.log(itemsInCart[i].product.price);
      cartTotal += itemsInCart[i].product.price * itemsInCart[i].quantity;
    }
    setCartTotal(+(Math.round(cartTotal + "e+2") + "e-2"));
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          itemsInCart,
          setItemsInCart,
          products,
          setProducts,
          updateCartItem,
          cartTotal,

          total,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
