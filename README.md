How to run the application (npm run dev):
-Make sure you are in the root directory (stocks).
-I cannot submit my code with node_modules,
but make sure to run the code with node_modules in the root directory,
or npm will throw an error.
-Type "npm run dev" to run the frontend and start the server.
-Some things to note:
-The Refresh Prices button will not always update stock prices, and this is
intentional. Prices can be updated at most once an hour.
-There is a lot of commented code that you should ignore: those sections
are things that I want to iterate upon on my own.


The goal of my application, Tetra, is to provide individual investors with
accurate data on the top 20 stocks in the S&P 500, as well as portfolio
visualizations. Users can find value in the quality of the data and the
functionality, as well as the user experience, which most finance sites
tend to neglect.
Now, to get a better feel for Tetra's purpose, especially for those with
a limited background in finance, we will walk through a quick situation.
Let's imagine that there is a team of students doing their first stock pitch
competition and they choose Amazon. The team has one week to
do extensive research and make their investment recommendation. 
They could scour the internet for all of the information they need 
on Amazon and it's competitors, but that would be
really time-consuming and difficult. Instead, the team can use Tetra.
What makes Tetra stand out from other financial data sites is that it's
extremely usable and visual. The team can filter by sector and instantly
know Amazon's top competitors and do a direct comparison. Additionally,
they can see the exact value of their portfolio if they invested in Amazon
versus a competitor. The team can find the information they need faster and
easier, and spend more time on designing their thesis and presentation!

Now, how did I use design to manifest Tetra's purpose?
My application implements the following design principles: usability,
readability, affordances, and intuitive design. I achieved readability by
contrasting text colors and background colors and placing text in easy-to-find
places. I implemented intuitive design by mimicking popular finance websites'
designs and improving upon them by making my pages significantly less busy. An
affordance I included was on the Terminal page, which was cutting off the
second row of stocks, implying to the user that they should scroll to see more;
another affordance was on the Portfolio Visualizer Page, which displays a
loader, telling the user that their visualization is coming soon. All of these
things together makes my application very usable.

Now a bit about the technical side:
Data is passed down through my components through props. Nearly all of my
components have props, and they vary from static data (e.g. the tickers list),
to data pulled from an API, to functions. I won't go through every
single prop, because that would take way too long, but in essence, props is the
way my components interact with each other.
Many of my components have states that hold different info (note my Visualizer
component does have a state, but it's formatted differently because it's a
functional component). States are changed by mainly these actions: using a
select (think sorting, filtering), an input (think searching), or clicking a
a button (think Refresh Prices or Visualize).
