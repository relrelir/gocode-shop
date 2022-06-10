import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Products from "./components/Products/Products.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((theData) => {
        setData(theData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Request Failed", err);
        throw err;
      });
  }, []);

  const categories = data
    .map((product) => product.category)
    .filter(
      //returns only categories on theire first show of the collection array in Alphabetical order
      (category, index, categories) => categories.indexOf(category) === index
    )
    .sort();

  //[category= a changeable var (an array in this case), setCategory= will change the var according to logic.] "all"=defult value of the changable var.

  return (
    <div>
      <Header //send props to header
        setCategory={setCategory}
        categories={categories}
      />
      {/* <ToggleButton /> */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Products
          collection={data.filter((product) =>
            category === "all" ? true : product.category === category
          )}
        />
      )}
    </div>
  );
}

export default App;
