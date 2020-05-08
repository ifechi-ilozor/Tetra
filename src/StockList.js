import React from 'react';
import Stock from './Stock';
import green_arrow from './green-arrow.png';
import red_arrow from './red_arrow1.png';

const StockList = (props) => {
  return (
    <div className="list">
      { props.stocks.length > 0 ?
        props.stocks.map((stock, i) => {
          return <Stock
            key={i}
            image={props.images[stock["1. symbol"]]}
            name={stock["5. full_name"]}
            ticker={stock["1. symbol"]}
            price={stock["2. price"]}
            gnl={stock["7. gain?"] === "true"?
              green_arrow : red_arrow}
            time={stock["4. timestamp"].slice(0, -3)}/>
        }) : "No stocks match these criteria."
      }
    </div>
  );
};

export default StockList;
