import Product from "../Product/Product.js";
import products from "./products.css";

const Products = ({ collection }) => {
  return (
    <section className="products">
      {collection.map((prop) => (
        <Product
          image={prop.image}
          key={prop.id}
          title={prop.title}
          category={prop.category}
          rating={prop.rating}
          rate={prop.rate}
          count={prop.count}
          price={prop.price}
          description={prop.description}
        />
      ))}
    </section>
  );
};

export default Products;
