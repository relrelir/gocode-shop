import "./App.css";
import Header from "./components/Header/Header.js";
import Products from "./components/Products/Products.js";
import { productsCollection } from "./productsCollection.js";

function App() {
  return (
    <div>
      <Header />

      <Products collection={productsCollection} />
    </div>
  );
}

export default App;
