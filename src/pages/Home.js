import { useContext, useEffect, useState } from "react";
import Cart from "../components/Cart/Cart.js";
import Header from "../components/Header/Header.js";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
import Products from "../components/Products/Products.js";
import cartContext from "../context/cartContext.js";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPricesRange, setCurrentPricesRange] = useState([0, 10000]);
  const [currentrate, setCurrentrate] = useState(null);

  const { products, setProducts, cartTotal } = useContext(cartContext);

  function fetchProducts() {
    setIsLoading(true);

    fetch("https://gocode-bituach-yashir.glitch.me/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(() => data);
        setCategories(() =>
          data
            .map((product) => product.category)
            .filter(
              (category, index, categories) =>
                categories.indexOf(category) === index
            )
            .sort()
        );
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

  const byRating = (product, rate) => rate <= product.rate;
  const byCategory = (product, category) =>
    category === "all" || product.category === category;

  const byPricesRange = (product, pricesRange) =>
    pricesRange[0] < product.price && product.price < pricesRange[1];

  const filteredProducts = products.filter(
    (product) =>
      byCategory(product, currentCategory) &&
      byPricesRange(product, currentPricesRange) &&
      byRating(product, currentrate)
  );

  return (
    <div>
      <Header
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
        categories={categories}
        setCurrentPricesRange={setCurrentPricesRange}
        currentPricesRange={currentPricesRange}
        setCurrentrate={setCurrentrate}
        currentrate={currentrate}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : !products.length ? (
        <p>Request Failed</p>
      ) : filteredProducts.length ? (
        <>
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
