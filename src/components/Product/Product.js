import "./product.css";

const Product = ({
  price,
  title,

  image,
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} />
      </div>
      <div className="product-info">
        <h5 description={title}>{title}</h5>
        <h6 price={price}>{price}</h6>
      </div>
    </div>
  );
};

export default Product;
