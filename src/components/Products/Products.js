import Product from "../Product/Product.js";
import "./Products.css";

const Products = ({ collection, filterCategory }) => {
  return (
    <section className="products">
      {collection.map(
        ({
          image,
          id,
          title,
          category,
          price,
          description,
          rating: { rate, count },
        }) => (
          <Product
            image={image}
            key={id}
            title={title}
            category={category}
            count={count}
            rate={rate}
            price={price}
            description={description}
          />
        )
      )}
    </section>
  );
};

export default Products;
