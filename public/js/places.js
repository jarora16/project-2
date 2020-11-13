function renderPlace() {
  const placesUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAPG0uMATmuMmwuy_3nntET_8HdaykPkZE&place_id=ChIJ4-bYSvxbwokRPhLlLQFzOEo";

  $.ajax({
    url: placesUrl,
    method: "GET"
  }).then((response) => {
    console.log(response);
    const places = response.result;
    // Restaurant name
    const resName = $("<h1>").text(places.name);
    $("#restaurant-name").append(resName);
    // Restaurant rating
    const resRating = $("<h3>").text(places.rating + "/5");
    $("#restaurant-rating").append(resRating);
    // Total number of resturant reviews
    const resNumRating = $("<p>").text(places.user_ratings_total + " Reviews");
    $("#restaurant-numRating").append(resNumRating);
    // Restuarant price level
    const resPrice = $("<p>").text("Price: " + places.price_level + "/5");
    $("#restaurant-price").append(resPrice);
    // Is Resturant Open
    const isOpen = $("<p>").text(places.opening_hours.open_now);
    $("#restaurant-isopen").append(isOpen);
    // Resturant hours
    const resHours = $("<p>").text(places.opening_hours.weekday_text[4]);
    $("#restaurant-hours").append(resHours);
    // Resturant address
    const resAddress = $("<p>").text(places.formatted_address);
    $("#restaurant-contact").append(resAddress);
    // Resturant phone number
    const resPhone = $("<p>").text(places.formatted_phone_number);
    $("#restaurant-contact").append(resPhone);
    // Resturant website
    const resWebsite = $("<p>").text(places.website);
    $("#restaurant-contact").append(resWebsite);
  });
}

renderPlace();
