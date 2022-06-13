import "./Product.css";
import { useContext } from "react";
import { useState } from "react";
import cartContext from "../../context/cartContext";

const Product = ({ id, price, title, image }) => {
  const [productsNum, setProductsNum] = useState(0);
  const { quantity, setQuantity, cartProducts, setCartProducts } =
    useContext(cartContext);

  const addToCart = () => {
    setCartProducts([...cartProducts, { id, price, title, image }]);
    console.log("id:", id, "title:", title, "price:", price);
    console.log("cartProducts:", cartProducts);
    setQuantity(quantity + 1);
  };

  const removeFromCart = () => {
    if (quantity > 0) {
      console.log("id:", id);
      setCartProducts(id);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} />
      </div>
      <div className="product-info">
        <h5 description={title}>{title}</h5>
        <h6 price={price}>{price} $</h6>

        <button onClick={removeFromCart}>-</button>
        <div style={{ color: "red" }}>{quantity}</div>
        <button onClick={addToCart}>+</button>
      </div>
    </div>
  );
};

export default Product;
