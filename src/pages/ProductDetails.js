import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.js";
import cartContext from "../context/cartContext";

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { updateCartItem, itemsInCart, total } = useContext(cartContext);

  let index = itemsInCart.findIndex(({ product: { id } }) => id === product.id);
  let cartItem = itemsInCart[index];
  let quantity = cartItem ? cartItem.quantity : 0;

  function fetchProductId() {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(() => product);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Request Failed", err);
      });
  }

  useEffect(() => {
    if (!product) {
      // if (products?.length) {
      //   setProduct(products.find((p) => p.id === productId));
      //   setIsLoading(false);
      // } else {
      fetchProductId();
      //   }
    } else {
      setIsLoading(false);
    }
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : product ? (
        <>
          <h1>{product.title}</h1>
          <img style={{ width: "30%" }} src={product.image} />
          <h5>{product.description}</h5>
          <h1>
            ${product.price}
            <button
              onClick={() => {
                updateCartItem(index, product, quantity - 1, cartItem?.note);
                total();
              }}
            >
              -
            </button>
            <input
              size={1}
              value={quantity}
              onChange={(event) => {
                updateCartItem(
                  index,
                  product,
                  event.target.value,
                  cartItem?.note
                );
                total();
              }}
            />
            <button
              onClick={() => {
                updateCartItem(index, product, ++quantity, cartItem?.note);
                total();
              }}
            >
              +
            </button>
            {/* <Rating name="read-only" value={rate} readOnly /> */}
          </h1>
        </>
      ) : (
        <p>Oops some error!</p>
      )}
    </div>
  );
}
