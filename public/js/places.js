function renderPlace() {
  const placesUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAPG0uMATmuMmwuy_3nntET_8HdaykPkZE&place_id=ChIJ4-bYSvxbwokRPhLlLQFzOEo";

  $.ajax({
    url: placesUrl,
    method: "GET"
  }).then((response) => {
    console.log(response);
    const places = response.result;
    // Restaurant name
    const resName = places.name;
    // Restaurant rating
    const resRating = places.rating;
    // Total number of resturant reviews
    const resNumRating = places.user_ratings_total;
    // Restuarant price level
    const resPrice = places.price_level;
    // Is Resturant Open
    const isOpen = places.opening_hours.open_now;
    // Resturant hours
    const resHours = places.opening_hours.weekday_text[4];
    // Resturant website
    const resWebsite = places.website;
    // Resturant address
    const resAddress = places.formatted_address;
    // Resturant phone number
    const resPhone = places.formatted_phone_number;
  });
}

renderPlace();
