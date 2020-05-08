const express = require('express');
const router = express.Router();
const Viz = require('./viz');

// sample data
// const data = {
//   graphDataX: ['January', 'February'],
//   graphDataY: [100.5, 109.4]
// };

// instance of model
// const newViz = new Viz(data);
// saving data to mongodb
// newViz.save((error) => {
//   if (error) {
//     console.log("error");
//   } else {
//     console.log("saved!");
//   }
// });

const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/scraping', (req, res) => {
    var companies = req.query.companies.split(',');
    var weights = req.query.weights.split(',') || [1];
    var investment = [parseInt(req.query.investment)] || [1000];
    res.setHeader('Content-Type', 'application/json');
    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        var scrapedData = [];
        for (var i = 0; i < companies.length; i++) {
          // Viz.find({ })
          // .then((data) => {
          //   console.log(data);
          // })
          // .catch((error) => {
          //   console.log(error);
          // });
          await page.goto(`https://finance.yahoo.com/quote/${companies[i]}/history?period1=1543616963&period2=1575152963&interval=1mo&filter=history&frequency=1mo`,
                          {waitUntil: 'domcontentloaded'});
          const scrapedData1 = await page.evaluate(() => {
          var info = Array.from(document
            .querySelectorAll("tr[class='BdT Bdc($seperatorColor) Ta(end) Fz(s) Whs(nw)']"))
            .map(entry => {
              var cells = entry.children;
              if (cells.length < 7) {
                return;
              }
              var month = cells[0].firstChild.innerHTML;
              var adjClose = cells[5].firstChild.innerHTML;
              return [month, adjClose];
            });
            return info;
          });
          scrapedData.push(scrapedData1);
     }
     await page.close();
     await browser.close();

     for (var i = 0; i < scrapedData.length; i++) {
       scrapedData[i] = scrapedData[i].filter(el => {
         return el != null;
       });
     }
     var x = scrapedData[0].map(el => {
       return el[0];
     });
     x.reverse();

     var growths = [];
     for (var i = 0; i < scrapedData.length; i++) {
       var y = scrapedData[i].map(el => {
         return parseFloat(el[1].replace(/,/g, ''));
       });
       y.reverse();
       growths.push(y);
     }

     for (var i = 1; i < growths[0].length; i++) {
       investment.push(0);
     }

     for (var i = 0; i < growths.length; i++) {
       var inv1 = [investment[0] * parseFloat(weights[i])];
       for (var j = 1; j < growths[i].length; j++) {
         var tmp = (growths[i][j]/growths[i][j-1]) * inv1[j-1];
         inv1.push(tmp);
         investment[j] += tmp;
       }
     }

     for (var i = 0; i < investment.length; i++) {
       investment[i] = investment[i].toFixed(2);
     }

     return res.send([x, investment]);
    })();
});

module.exports = router;
