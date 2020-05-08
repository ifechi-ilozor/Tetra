import React from 'react';

const Search = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.handleSearch} action="">
        <select id="sort-select" defaultValue="Sort" onChange={props.handleSort}>
          <option value="Sort">Sort</option>
          <option value="Price-Lowest">Price - Lowest</option>
          <option value="Price-Highest">Price - Highest</option>
        </select>
        <select defaultValue="All" onChange={props.handleFilterSec}>
          <option value="All">All Sectors</option>
          <option value="Tech">Tech</option>
          <option value="Consumer Cyclical">Consumer Cyclical</option>
          <option value="Consumer Defensive">Consumer Defensive</option>
          <option value="Communication Services">Communication Services</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Energy">Energy</option>
        </select>
        <select defaultValue="All" onChange={props.handleFilterGnl}>
          <option value="All">Gainers and Losers</option>
          <option value="Gain">Price Greater Than Prev</option>
          <option value="Loss">Price Less Than Prev</option>
        </select>
        <input id="search-input"
               onChange={props.searchChanges}
               type="text"
               placeholder="Search By Stock Name or Ticker"/>
      </form>
    </div>
  );
};

export default Search;
