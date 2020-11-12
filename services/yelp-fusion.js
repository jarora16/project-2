// Dependencies
// ===========================================================
require("dotenv").config();
const yelp = require("yelp-fusion");
const restaurantResult = "Win+Son";
const locationResult = "brooklyn,ny";
const yelpApiKey = process.env.DB_YELP;


const yelpSearchRequest = {
    term: restaurantResult,
    location: locationResult
};

const yelpClient = yelp.client(yelpApiKey);

// Search Yelp
// ===========================================================
yelpClient.search(yelpSearchRequest).then(response => {
    // eslint-disable-next-line prefer-destructuring
    const result = response.jsonBody.businesses[0];
    const resultJson = JSON.stringify(result, null, 4);
    console.log(resultJson);
})
    .catch(err => {
        console.log(err);
    });
