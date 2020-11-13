function renderPlace() {
  const placesUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAPG0uMATmuMmwuy_3nntET_8HdaykPkZE&place_id=ChIJ4-bYSvxbwokRPhLlLQFzOEo";

  $.ajax({
    url: placesUrl,
    method: "GET"
  }).then((response) => {
    console.log(response);
  });
}

renderPlace();
