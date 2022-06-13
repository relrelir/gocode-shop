import Product from "../Product/Product.js";
import "./Products.css";

const Products = ({ filteredProducts }) => {
  return (
    <section className="products">
      {filteredProducts.map(
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
            id={id}
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
