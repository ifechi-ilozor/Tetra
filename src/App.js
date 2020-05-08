import React, { Component } from 'react';
import Stocks from './Stocks';
import About from './About';
import Visualizer from './Visualizer';
import request from 'superagent';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickers: [
        'MSFT', 'AAPL', 'AMZN', 'FB',
        'BRK.B', 'GOOG', 'GOOGL', 'JPM',
        'JNJ', 'XOM', 'V', 'BAC',
        'INTC', 'PG', 'CSCO', 'DIS',
        'HD', 'VZ', 'CVX', 'MA'
      ],
      tickers_scrape: [
        'MSFT', 'AAPL', 'AMZN', 'FB',
        'BRK-B', 'GOOG', 'GOOGL', 'JPM',
        'JNJ', 'XOM', 'V', 'BAC',
        'INTC', 'PG', 'CSCO', 'DIS',
        'HD', 'VZ', 'CVX', 'MA'
      ],
      stock_names: [
        'Microsoft', 'Apple', 'Amazon', 'Facebook',
        'Berkshire Hathaway', 'Alphabet Class C',
        'Alphabet Class A', 'JPMorgan Chase & Co.',
        'Johnson & Johnson', 'Exxon Mobil', 'Visa',
        'Bank of America','Intel', 'Proctor & Gamble',
        'Cisco Systems', 'Walt Disney', 'Home Depot',
        'Verizon', 'Chevron', 'Mastercard'
      ],
      sectors: [
        'Tech', 'Tech', 'Consumer Cyclical', 'Communication Services',
        'Finance', 'Communication Services',
        'Communication Services', 'Finance',
        'Healthcare', 'Energy', 'Finance',
        'Finance', 'Tech', 'Consumer Defensive',
        'Tech', 'Communication Services', 'Consumer Cyclical',
        'Communication Services', 'Energy', 'Finance'
      ],
      images: {
        'MSFT': 'https://c.s-microsoft.com/en-us/CMSImages/hero-bm.jpg?version=5f4cbb07-1e63-6b48-4130-f8a4ebbf28a6',
        'AAPL': 'https://s.blogcdn.com/slideshows/images/slides/271/178/3/S2711783/slug/l/apple-store-logo-on-5th-avenue-in-new-york-city-glass-building-by-bohlin-cywinski-jackson-architects-for-editorial-use-only-1.jpg',
        'AMZN': 'https://media.npr.org/assets/img/2017/10/13/img_1205_slide-0f2514f1a7632d5ea847a12afd691972bce17047-s800-c85.jpg',
        'FB': 'https://media.breitbart.com/media/2019/09/Facebook-640x480.jpg',
        'BRK.B': 'https://d2x3xhvgiqkx42.cloudfront.net/ae3d5cae-6d00-4e81-9a2b-4b1938ce6880/23dc4d08-311b-464c-a110-ed721d5b88d8/2018/06/25/a157c56f-083a-4e97-9198-097aa1ced55b.jpg',
        'GOOG': 'https://i.kinja-img.com/gawker-media/image/upload/s--upSkg4CQ--/c_scale,f_auto,fl_progressive,q_80,w_800/eedaxdhik734jgrqsysg.jpg',
        'GOOGL': 'https://patch.com/img/cdn20/users/22880695/20180412/083254/styles/raw/public/processed_images/shutterstock_552493561-1523579448-7117.jpg',
        'JPM': 'https://s4.reutersmedia.net/resources/r/?m=02&d=20180221&t=2&i=1233732941&r=LYNXNPEE1K1ZY&w=1280',
        'JNJ': 'https://officesnapshots.com/wp-content/uploads/2018/07/johnson-and-johnson-offices-bogota-19-700x467.jpg',
        'XOM': 'https://mmoser.imgix.net/uploads/2019_03/3-2157_ExxonMobil-SH-Vitus-Exterior_02.jpg?auto=format&fit=crop&crop=faces&w=1425&h=750',
        'V': 'https://ak4.picdn.net/shutterstock/videos/1032491984/thumb/1.jpg',
        'BAC': 'https://media.glassdoor.com/l/87/33/78/2c/bank-of-america.jpg',
        'INTC': 'https://cnet2.cbsistatic.com/img/2B621PrZNh7HhlUoUX8oFIUv2C0=/1200x675/2018/01/04/0737cdef-85e3-4297-a57f-e6478cff3256/20171113-intel-hq-santa-clara-01.jpg',
        'PG': 'https://www.gannett-cdn.com/-mm-/0aa35dcc1e74c202b3f825e96fcdc57aef5845c9/c=0-266-3567-2281/local/-/media/2017/05/19/USATODAY/USATODAY/636308060980975671-pg.JPG?auto=webp&format=pjpg&width=1200',
        'CSCO': 'https://essentialinstall.com/commercial/wp-content/uploads/sites/3/2017/11/Cisco-HQ.jpg',
        'DIS': 'https://www.renderhub.com/squir/disney-cinderella-castle/disney-cinderella-castle-01.jpg',
        'HD': 'https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer//mm9TVBNYqhIB0lhiLL3rdq2GOfI=/1660x934/smart/filters:no_upscale()/arc-anglerfish-arc2-prod-dmn.s3.amazonaws.com/public/BSVBWXDI4BI3BEPGDFPZD5ZEX4.jpg',
        'VZ': 'https://www.notebookcheck.net/fileadmin/_processed_/f/d/csm_verizon_headquarters_nyc_8deb51fb23.jpg',
        'CVX': 'https://media.bizj.us/view/img/11237040/chevron022819tj-1*750xx7360-4140-0-386.jpg',
        'MA': 'https://i1.pickpik.com/photos/232/41/316/money-card-business-credit-card-preview.jpg'
      }
    };
  }

  componentDidMount() {
    this.runOncePerHour();
  }

  hasOneHourPassed = () => {
    //today's date & hour
    const date = new Date();
    const dateStr = new Date().toLocaleDateString();
    const dateHr = date.getHours().toString();
    if (localStorage.getItem('dateStr') === dateStr) {
      if (localStorage.getItem('dateHr') === dateHr) {
        return false;
      }
      localStorage.setItem('dateHr', dateHr);
      return true;
    }
    localStorage.setItem('dateStr', dateStr);
    localStorage.setItem('dateHr', dateHr);
    return true;
  };

  runOncePerHour = () => {
    if(!this.hasOneHourPassed()) {
      return;
    }
    this.loadStockData().then();
  };

  loadStockData = async () => {
    request
      .get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=xxx&symbols=${this.state.tickers}`)
      .then((data) => {
        let info = data.body["Stock Quotes"];
        for (let i = 0; i < 20; i++) {
          info[i]["5. full_name"] = this.state.stock_names[i];
          info[i]["6. sector"] = this.state.sectors[i];
            let gain =
              parseInt(info[i]["2. price"]) >= parseInt(JSON.parse(localStorage.getItem('stocks'))[i]["2. price"]);
            info[i]["7. gain?"] = gain.toString();
        }
        localStorage.setItem('prev_stocks', localStorage.getItem('stocks'));
        localStorage.setItem('stocks', JSON.stringify(info));
      })
  };

  render () {
    return (
      <Router>
      <header>
        <i className="fas fa-cubes fa-2x"/>
        <h1>tetra</h1>
        <div id="nav-container">
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/">Terminal</Link>
              </li>
              <li>
                <Link to="/portfolio-visualizer">Portfolio Visualizer</Link>
              </li>
            </ul>
        </div>
      </header>
      <Route path="/" exact strict render={
        () => { document.body.style = 'background: #001420;';
          return (
          <div className="App">
            <Stocks stocks={JSON.parse(localStorage.getItem('stocks'))}
                    names={this.state.stock_names}
                    tickers={this.state.tickers}
                    sectors={this.state.sectors}
                    images={this.state.images}
                    updateInfo={this.updateInfo}/>
          </div>
        );}
      }/>
      <Route path="/about" exact strict component={About}/>
      <Route path="/portfolio-visualizer" exact strict render={(props) => <Visualizer {...props} tickers={this.state.tickers_scrape} />}/>
      </Router>
    );
  }
}

export default App;
