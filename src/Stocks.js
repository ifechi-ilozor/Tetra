import React, { Component } from 'react';
import Search from './Search';
import StockList from './StockList';

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      sort: '',
      filter_sector: 'All',
      filter_gnl: 'All',
      stocks: this.props.stocks
    }
  }

  searchStock = (search, filteredStocks) => {
    if (search === '') {
      return filteredStocks;
    }
    this.props.names.forEach((element, index) => {
      if ((search === element || search === element.toLowerCase()) &&
                          filteredStocks.includes(this.props.stocks[index])) {
        filteredStocks = [this.props.stocks[index]];
      }
    });
    this.props.tickers.forEach((element, index) => {
      if ((search === element || search === element.toLowerCase()) &&
                          filteredStocks.includes(this.props.stocks[index])) {
        filteredStocks = [this.props.stocks[index]];
      }
    });
    return filteredStocks;
  };

  handleSort = (e) => {
    this.setState({ sort: e.target.value });
  };

  handleFilterSec = (e) => {
    this.setState({ filter_sector: e.target.value });
  };

  handleFilterGnl = (e) => {
    this.setState({ filter_gnl: e.target.value });
  };

  searchChanges = (e) => {
    e.preventDefault();
    let search = document.getElementById('search-input').value;
    this.setState({ searchField: search });
  };

  render () {
    // eslint-disable-next-line array-callback-return
    let filteredStocks = this.props.stocks.filter((stock) => {
      if (this.state.filter_sector === 'All') {
        return stock;
      } else if (this.state.filter_sector === stock["6. sector"]) {
        return stock;
      } else {
      }
    });
    // eslint-disable-next-line array-callback-return
    let filteredStocks2 = [...filteredStocks].filter((stock) => {
      if (this.state.filter_gnl === 'All') {
        return stock;
      } else if (this.state.filter_gnl === 'Gain') {
        if (stock["7. gain?"] === "true") {
          return stock;
        }
      } else if (this.state.filter_gnl === 'Loss') {
        if (stock["7. gain?"] === "false") {
          return stock;
        }
      }
    });
    let searchedStocks = this.searchStock(this.state.searchField, filteredStocks2);
    let sortedStocks = [...searchedStocks].sort((a,b) => {
      if (this.state.sort === 'Price-Highest') {
        return parseInt(b["2. price"]) - parseInt(a["2. price"]);
      } else if (this.state.sort === 'Price-Lowest') {
        return parseInt(a["2. price"]) - parseInt(b["2. price"]);
      } else {
        return 0;
      }
    });
    return (
      <div>
        <Search searchChanges = {this.searchChanges}
                handleSort={this.handleSort}
                handleFilterSec={this.handleFilterSec}
                handleFilterGnl={this.handleFilterGnl}
                updateInfo={this.props.updateInfo}/>
        <div className="filler">Space</div>
        <StockList stocks={sortedStocks} images={this.props.images}/>
      </div>
      );
  }
}

export default Stocks;
