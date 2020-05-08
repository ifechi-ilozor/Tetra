import React from 'react';

const Stock = (props) => {
  return (
    <div className="stock-container">
      <img src={props.image} alt=""/>
      <div className="desc">
        <div id="name">
          <h2>{props.name}</h2> <h3>{props.ticker}</h3>
        </div>
        <br/>
        <p id="price">${props.price}</p> <img src={props.gnl} id="arrow" alt=""/>
        <p id="timestamp">{props.time}</p>
      </div>
    </div>
  );
};

export default Stock;
