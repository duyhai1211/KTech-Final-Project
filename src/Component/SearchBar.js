import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <select>
        <option value="">대분류</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
      <select>
        <option value="">중분류</option>
        <option value="subcategory1">Subcategory 1</option>
        <option value="subcategory2">Subcategory 2</option>
      </select>
      <select>
        <option value="">소분류</option>
        <option value="subsubcategory1">Sub-subcategory 1</option>
        <option value="subsubcategory2">Sub-subcategory 2</option>
      </select>
      <button type="button">검색</button>
    </div>
  );
};

export default SearchBar;
