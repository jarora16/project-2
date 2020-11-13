function renderPlace() {
  const placesUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAPG0uMATmuMmwuy_3nntET_8HdaykPkZE&place_id=ChIJ4-bYSvxbwokRPhLlLQFzOEo";

  $.ajax({
    url: placesUrl,
    method: "GET"
  }).then((response) => {
    console.log(response);
    const places = response.result;
    // Restaurant name
    const resName = $("<h2>").text(places.name);
    $("#restaurant-info").append(resName);
    // Restaurant rating
    const resRating = $("<p>").text(places.rating);
    $("#restaurant-info").append(resRating);
    // Total number of resturant reviews
    const resNumRating = $("<p>").text(places.user_ratings_total);
    $("#restaurant-info").append(resNumRating);
    // Restuarant price level
    const resPrice = $("<p>").text(places.price_level);
    $("#restaurant-info").append(resPrice);
    // Is Resturant Open
    const isOpen = $("<p>").text(places.opening_hours.open_now);
    $("#restaurant-info").append(isOpen);
    // Resturant hours
    const resHours = $("<p>").text(places.opening_hours.weekday_text[4]);
    $("#restaurant-info").append(resHours);
    // Resturant website
    const resWebsite = $("<p>").text(places.website);
    $("#restaurant-info").append(resWebsite);
    // Resturant address
    const resAddress = $("<p>").text(places.formatted_address);
    $("#restaurant-info").append(resAddress);
    // Resturant phone number
    const resPhone = $("<p>").text(places.formatted_phone_number);
    $("#restaurant-info").append(resPhone);
  });
}

renderPlace();
