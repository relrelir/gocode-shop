import "./Header.css";

import { useState, useContext } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Cart from "../Cart/Cart";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import cartContext from "../../context/cartContext";

const Header = ({
  setCurrentCategory,
  currentCategory,
  categories,
  setCurrentPricesRange,
  currentPricesRange,

  currentrate,
  price,
}) => {
  // const sortBy = [
  //   "Featured,Best Selling",
  //   "Alphabetically, A-Z",
  //   "Alphabetically, Z-A",
  //   "Price low to high",
  //   "Price high to low",
  // ];
  // const { currentSort, setCurrentSort } = useState(sortBy[0]);
  const { setIsCartOpen } = useContext(cartContext);

  const handleChangeFiltering = (event) => {
    setCurrentCategory(event.target.value);
  };
  // const handleChangeSorting = (event) => {
  //   setCurrentSort(event.target.value);
  // };

  // console.log(currentSort);
  return (
    <nav>
      <h1>GoCode Shop</h1>
      <div className="product-filter">
        <Box>
          <ShoppingCartIcon
            sx={{
              boxShadow: 2,
            }}
            size="large"
            onClick={() => setIsCartOpen(true)}
          />

          <MenuIcon />
        </Box>
        <Box paddingRight={"100px"} sx={{ width: 250 }}>
          <Slider
            valueLabelDisplay="on"
            getAriaLabel={() => "prices range"}
            value={currentPricesRange}
            onChange={(e, newValue) => {
              setCurrentPricesRange(newValue);
            }}
            max={1000}
          />
        </Box>

        <Box>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Categories:
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={currentCategory}
              onChange={handleChangeFiltering}
              autoWidth
              label="Categories"
            >
              <MenuItem value="all">All Products</MenuItem>
              {categories.map((category, index) => {
                console.log("category", category);
                return (
                  <MenuItem
                    key={index}
                    value={category}
                    selected={currentCategory === category}
                    helpertext="Please select category"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                );
              })}

              <br />
            </Select>
          </FormControl>
        </Box>

        {/* <Box>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="simple-select-autowidth-label">Sort by:</InputLabel>
            <Select
              labelId="simple-select-autowidth-label"
              id="simple-select-autowidth"
              value={currentSort}
              onChange={handleChangeSorting}
              autoWidth
              label=" Sort by:"
            >
              {sortBy.map((Sort, index) => (
                <MenuItem
                  key={index}
                  value={sortBy}
                  selected={currentSort === sortBy}
                  helperText="You can Sort by:"
                >
                  {Sort}
                </MenuItem>
              ))}

              <br />
            </Select>
          </FormControl>
        </Box> */}

        {/* <div className="collection-sort">
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
        </div> */}
      </div>
    </nav>
  );
};

export default Header;
