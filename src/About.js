import React, { Component } from 'react';
import './App.css';

class About extends Component {

  render () {
    return (
      <div className="container">
        <section id="home">
          <h1>welcome to tetra</h1>
          <p className="lead">where we are democratizing access to financial markets data.</p>
        </section>
        <section id="about">
          <h1>About</h1>
          <p className="lead">
          tetra is the place for individual investors
          to get the data they need to build well-informed <br/> portfolios.
          Our dedicated web crawlers scan the web for
          relevant info, and we complement those <br/> findings with data
          from renown finance APIs. We serve data to you in clean and intuitive formats.
          </p>
          <div className="filler">Space</div>
          <div id="about1">
               <img id="about-img" alt="" src="https://developers.arcgis.com/assets/img/features/features-hero_visualization.png"/>
          </div>
        </section>
        <section id="service">
          <h1>Service</h1>
          <p className="lead">
          Our main service is The tetra
          Terminal, which displays critical stock market
          information. <br/> We provide realtime prices and key facts
          of the top 20 stocks in the Standard & Poors 500, <br/> with easy sorting,
          filtering and searching features. Additionally, users are able
          to use the <br/> seamless portfolio visualizer to backtest
          their investment ideas. In the near future, <br/> we will offer full
          customization in the terminal, financial reports, newsfeeds, <br/>
          sentiment analysis, and analyst ratings.
          </p>
        </section>
        <section id="contact">
          <h1>Contact</h1>
          <p className="lead">We are always looking to improve our platform.
          Please contact us if you have any issues or requests. <br />
          Feature request contact: 123@tetra.com <br />
          Customer support: 321@tetra.com
          </p>
        </section>
      </div>
      );
  }
}

export default About;
