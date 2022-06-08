import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.js";
import Products from "./components/Products/Products.js";
import { productsCollection } from "./productsCollection.js";
// import ToggleButton from "./components/ToggleButton.js";

function App() {
  const [category, setCategory] = useState("all");
  //[category= a changeable var (an array in this case), setCategory= will change the var according to logic.] "all"=defult value of the changable var.
  console.log(category);

  return (
    <div>
      <Header //send props to header
        setCategory={setCategory}
        collection={productsCollection}
      />
      {/* <ToggleButton /> */}

      <Products
        collection={productsCollection.filter((product) =>
          category === "all"
            ? productsCollection
            : product.category === category
        )}
        filterCategory={category}
      />
    </div>
  );
}

export default App;
