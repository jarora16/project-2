function renderPlace() {
  const placesUrl = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.PLACES_API}&place_id=ChIJ4-bYSvxbwokRPhLlLQFzOEo`;

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
    const resRating = $("<h3>").text(places.rating + "/5 Stars");
    $("#restaurant-rating").append(resRating);
    // Total number of resturant reviews
    const resNumRating = $("<p>").text(places.user_ratings_total + " Reviews");
    $("#restaurant-rating").append(resNumRating);
    // Restuarant price level
    const resPrice = $("<p>").text("Price: " + places.price_level + "/5");
    $("#restaurant-price").append(resPrice);
    // Resturant hours
    const resHours = $("<p>").text(places.opening_hours.weekday_text[4]);
    $("#restaurant-hours").append(resHours);
    // Resturant address
    const resAddress = $("<p>").text(places.formatted_address);
    $("#restaurant-contact").append(resAddress);
    // Resturant phone number
    const resPhone = $(`<a href="tel:${places.formatted_phone_number}">${places.formatted_phone_number}</a><br/>`);
    $("#restaurant-contact").append(resPhone);
    // Resturant website
    const resWebsite = $(`<a href="${places.website}">${places.website}</a>`);
    $("#restaurant-contact").append(resWebsite);
  });
}

renderPlace();
