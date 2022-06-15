import { useContext, useEffect, useState } from "react";
import Cart from "../components/Cart/Cart.js";
import Header from "../components/Header/Header.js";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
import Products from "../components/Products/Products.js";
import cartContext from "../context/cartContext.js";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const { products, setProducts, cartTotal } = useContext(cartContext);

  function fetchProducts() {
    setIsLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(() => data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Request Failed", err);
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
      ) : !products.length ? (
        <p>
          Request Failed TypeError: Failed to fetch at fetchProducts Failed to
          load responsed data: No data found for resource with given identifier
        </p>
      ) : filteredProducts.length ? (
        <>
          <Header
            setCategory={setCategory}
            categories={categories}
            fetchProducts={fetchProducts}
          />

          <Products filteredProducts={filteredProducts} />

          <h3>Cart</h3>
          <Cart />
          <h5>TotalPrice:{cartTotal}</h5>
        </>
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
}
