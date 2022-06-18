import "./Header.css";

import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Header = ({
  setCurrentCategory,
  categories,
  currentCategory,
  setCurrentPricesRange,
  currentPricesRange,
  setCurrentrate,
  currentrate,
}) => {
  return (
    <nav className="product-filter">
      <h1>GoCode Shop</h1>
      <div className="sort">
        <Box paddingRight={"100px"} sx={{ width: 250 }}>
          <Slider
            valueLabelDisplay="on"
            getAriaLabel={() => "prices range"}
            value={currentPricesRange}
            onChange={(e, newValue) => {
              setCurrentPricesRange(newValue);
            }}
            // getAriaValueText={valuetext}
            max={1000}
          />
        </Box>
        <div className="collection-sort">
          <label>Filter by:</label>
          <select
            defaultValue={currentCategory}
            className="categories"
            onChange={(event) => {
              let category = event.target.value;
              setCurrentCategory(category);
            }}
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option
                key={index}
                value={category}
                // selected={currentCategory === category}
              >
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
