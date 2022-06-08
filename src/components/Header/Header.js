import "./Header.css";

const Header = ({ setCategory, collection }) => {
  const categories = collection
    .map((product) => product.category)
    .filter(
      //returns only categories on theire first show of the collection array in Alphabetical order
      (category, index, categories) => categories.indexOf(category) === index
    )
    .sort();
  return (
    <nav className="product-filter">
      <h1>Jackets</h1>

      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select
            className="categories"
            onChange={(event) => {
              let category = event.currentTarget.value;
              setCategory(category); //the logic that changes the value of the arr "category" from the useState HOOK. according to the category from the event.currentTarget.value of the onChange attribute;
              console.log(category);
            }}
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select>
            <option value="/">Featured</option>
            <option value="/">Best Selling</option>
            <option value="/">Alphabetically, A-Z</option>
            <option value="/">Alphabetically, Z-A</option>
            <option value="/">Price, low to high</option>
            <option value="/">Price, high to low</option>
            <option value="/">Date, new to old</option>
            <option value="/">Date, old to new</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Header;
