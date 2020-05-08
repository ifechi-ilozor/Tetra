import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from "react-apexcharts";

const Visualizer = (props) => {
  const [loading, setLoading] = useState(true);
  const [firstRun, setFirstRun] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [investment, setInvestment] = useState(1000);
  const abortController = new AbortController();

  useEffect(() => {
    getChartData().then();
    setFirstRun(false);
    // initAutoSuggest();
    return function cleanup() {
      abortController.abort();
    }
  }, []);

  const getChartData = async () => {
    let companies = [];
    let weights = [];
    let total_percent = 0;
    let selections = document.getElementsByClassName("selection");
    for (let i = 0; i < selections.length; i++) {
      let company_select = selections[i].children[0];
      let company = company_select.options[company_select.selectedIndex].value;
      companies.push(company);
      let percent_select = selections[i].children[1];
      let percent = parseFloat(percent_select.value) / 100.0;
      total_percent += parseFloat(percent_select.value) / 100.0;
      weights.push(percent.toFixed(1));
    }

    if (total_percent !== 1 && !firstRun) {
      window.alert("Please ensure that percentages total to 100%.");
      return;
    }

    setLoading(true);
    let res = await fetch(`http://localhost:3001/scraping?companies=${companies.toString()}&weights=${weights.toString()}&investment=${investment}`,
                            { signal: abortController.signal })
      .then(response => response.json());
    let categories = res[0];
    let series = res[1];
    setChartData({
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
        labels: {
          style: { colors: 'white' }
        }
      },
      yaxis: {
        labels: {
          style: { color: 'white' }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#001420'],
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          chart: {
            width: "190%",
            height: "280px"
          },
          xaxis: {
            labels: {
              show: false
            }
          }
        }
      }]
    });
    setSeries([
      {
        name: `Portfolio Value`,
        data: series
      }
    ]);
    setLoading(false);
  };

  const invChanges = (e) => {
    e.preventDefault();
    setInvestment(parseInt(e.target.value));
  };

  const addLi = (e) => {
    e.preventDefault();
    let li = document.createElement('li');
    li.appendChild(document.getElementById("choice-diversify").cloneNode(true));
    li.firstChild.children[3].style.visibility = 'hidden';
    li.firstChild.children[2].addEventListener('click', removeThisLi);
    e.target.parentNode.parentNode
      .parentNode.appendChild(
        li
      );
  };

  const removeThisLi = (e) => {
    e.target.parentNode.parentNode
      .parentNode.removeChild(e.target.parentNode.parentNode);
  };

  // const initAutoSuggest = () => {
  //   const searchInput = document.querySelector('#search-input1');
  //   const suggestionsPanel = document.querySelector('.suggestions');
  //
  //   searchInput.addEventListener('keyup', function() {
  //     const input = searchInput.value;
  //     suggestionsPanel.innerHTML = '';
  //     const suggestions = props.tickers.filter((el) => {
  //       return el.toLowerCase().startsWith(input);
  //     });
  //     suggestions.forEach((suggested) => {
  //       const div = document.createElement('div');
  //       div.innerHTML = suggested;
  //       suggestionsPanel.appendChild(div);
  //     });
  //     if (input === '') {
  //       suggestionsPanel.innerHTML = '';
  //     }
  //   })
  // };

  return (
    <div className='container' style={{ background: "#001420"}}>
    <><div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
        <input id="inv-input"
           onChange={invChanges}
           type="text"
           placeholder="Initial Investment"/>
        <button onClick={getChartData}>Visualize!</button>
      </div>
      <ul id="ul">
      <li>
        <div className="selection" id="choice-diversify" style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
          <select id="company-select">
            <option value="MSFT">MSFT</option>
            <option value="AMZN">AMZN</option>
            <option value="FB">FB</option>
            <option value="AAPL">AAPL</option>
            <option value="GOOG">GOOG</option>
            <option value="GOOGL">GOOGL</option>
            <option value="BRK-B">BRK.B</option>
            <option value="JPM">JPM</option>
          </select>

          <input className="percent"
                 id="percent-input"
                 type="text"
                 placeholder="        %"/>

          <button className="mini ui compact icon button">
            <i className="x icon"/>
          </button>
          <button className="mini positive ui compact icon button" onClick={addLi}>
            <i className="plus icon"/>
          </button>
        </div>
      </li>
      </ul>
    </>
      {loading ? (
        <div>
          <div className="filler">Space</div>
          <div className="filler">Space</div>
          <div className="filler">Space</div>
          <div className="filler">Space</div>
          <div className="ui active centered inline loader" style={{color: '#9c9c9c', fontFamily: 'avenir next'}}/>
          <div className="filler">Space</div>
          <div className="filler">Space</div>
        </div>
      ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#303030' }}>
              <Chart
                options={chartData}
                series={series}
                type="area"
                width="1200"
                height="300"
              />
            </div>
          </>
        )}
    </div>
  );
};

export default Visualizer;
