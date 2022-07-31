# App Details

This is a Cryptocurrency tracking app designed to mirror the functionality of the iphone Stocks app.
A watchlist contains basic information about tracked stocks. Currencies can be added to the watchlist via the search bar
or removed. The watchlist is stored in localStorage so that it is preserved across site visits. If clicked, the user is routed to a page with price plotting ability for various time-intervals, as well as additional
coin metrics. Styling is mostly done using bootstrap, plotting uses plotly.js. Routing comes from react-router.

The site is deployed at [https://dstern-react-cryptotracker.netlify.app/](https://dstern-react-cryptotracker.netlify.app/)

# Run With Docker

In order to run the app in a docker container for development, run `docker compose -f docker-compose.dev.yml -d`. This will build the app in development mode. For production mode, run `docker compose -f docker-compose.prod.yml -d`. The production image uses NGINX as a reverse proxy, and
serves the react bundle. The development build simply runs `npm start` inside of the docker container. The development build is accessed on port 3000, the production build on port 80.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
