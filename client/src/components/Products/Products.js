import { Grid } from "@mui/material";

import Product from "../Product/Product.js";
import "./Products.css";

const Products = ({ filteredProducts }) => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      {filteredProducts.map(
        ({
          image,
          _id,
          title,
          category,
          price,
          description,
          rating: { rate, count },
        }) => (
          <Product
            image={image}
            key={_id}
            id={_id}
            title={title}
            category={category}
            count={count}
            rate={rate}
            price={price}
            description={description}
          />
        )
      )}
    </Grid>
  );
};

export default Products;
