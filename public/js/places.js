function renderPlace() {
  const placesUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAPG0uMATmuMmwuy_3nntET_8HdaykPkZE";

  $.ajax({
    url: placesUrl,
    method: "GET"
  }).then((response) => {
    console.log(response);
  });
}

renderPlace();
