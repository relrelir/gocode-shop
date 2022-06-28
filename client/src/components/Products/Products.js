import { Grid } from "@mui/material";

import Product from "../Product/Product.js";
import "./Products.css";

const Products = ({ filteredProducts }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      spacing={2}
    >
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
          <Grid item xs={12} md={4} key={_id}>
            <Product
              image={image}
              id={_id}
              title={title}
              category={category}
              count={count}
              rate={rate}
              price={price}
              description={description}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Products;
