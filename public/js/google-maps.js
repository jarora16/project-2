// Dependencies
// ==================================================================
// require("dotenv").config();
// const googleApiKey = process.env.GOOGLEMAPS_AK;
const restaurantResult = "Win+Son";
const locationResult = "brooklyn,ny";

// iframe for map
// ==================================================================
const restaurantMap = `<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCbVGcEpq0kc21vUdngGQneZX98p--_9OI
  &q=${restaurantResult},${locationResult}" allowfullscreen>
  </iframe>`;

// Append to page
// ==================================================================
// eslint-disable-next-line no-undef
$("#google-map").append(restaurantMap);
