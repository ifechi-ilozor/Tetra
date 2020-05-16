# Tetra - Intuitive Equity and Portfolio Visualizations  

## How to run the application:
- Make sure you are in the root directory `stocks`.
- Type `npm run dev` to run the frontend and start the server.

## The Goal of Tetra
The goal of my application is to provide individual investors with accurate data on the top 20 stocks in the S&P 500, as well as portfolio visualizations. Users can find value in the quality of the data and the functionality, as well as the user experience, which most finance sites tend to neglect.

### Scenario
To get a better feel for Tetra's purpose, especially for those with a limited background in finance, we will walk through a quick situation. Let's imagine that there is a team of students doing their first stock pitch
competition and they choose Amazon. The team has one week to do extensive research and make their investment recommendation. 
They could scour the internet for all of the information they need on Amazon and it's competitors, or the team can use Tetra.
What makes Tetra stand out from other financial data sites is that it's extremely usable and visual. The team can filter by sector and instantly know Amazon's top competitors and do a direct comparison. Additionally,
they can see the exact value of their portfolio if they invested in Amazon versus a competitor. The team can find the information they need faster and easier, and spend more time on designing their thesis and presentation.

### How did I use design to manifest Tetra's purpose?
My application implements the following design principles: usability, readability, affordances, and intuitive design. I achieved readability by contrasting text colors and background colors and placing text in easy-to-find places. I implemented intuitive design by mimicking popular finance websites' designs and improving upon them by making my pages significantly less busy. An affordance I included was on the Terminal page, which was cutting off the second row of stocks, implying to the user that they should scroll to see more; another affordance was on the Portfolio Visualizer Page, which displays a loader, telling the user that their visualization is coming soon. All of these things together makes my application very usable.

### Technical details
Data is passed down through my components through props. Nearly all of my components have props, and they vary from static data (e.g. the tickers list), to data pulled from an API, to functions. 
Note on the API data: Alpha Vantage has since deprecated its BATCH_STOCK_QUOTE function, so Tetra currently only shows
stock close prices on December 31st, 2019.
