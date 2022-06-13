import "./App.css";
import Header from "./components/Header/Header.js";
import Products from "./components/Products/Products.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.js";
import Cart from "./components/Cart/Cart.js";
import { useState } from "react";
import { useEffect } from "react";
import CartContext from "./context/cartContext.js";

function App() {
  const [quantity, setQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);

  function fetchProducts() {
    setIsLoading(true);
    setCategory("all");
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Request Failed", err);

        throw err;
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = products
    .map((product) => product.category)
    .filter(
      (category, index, categories) => categories.indexOf(category) === index
    )
    .sort();

  const filteredProducts = products.filter((product) =>
    category === "all" ? true : product.category === category
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header
            setCategory={setCategory}
            categories={categories}
            fetchProducts={fetchProducts}
          />

          <CartContext.Provider
            value={{
              quantity,
              setQuantity,
              cartProducts,
              setCartProducts,
              products,
            }}
          >
            <Products filteredProducts={filteredProducts} />

            <Cart />
          </CartContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;
