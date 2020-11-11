var axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://yelpapiserg-osipchukv1.p.rapidapi.com/getAutocomplete',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': 'a889ce478emsh58a80932d1ea8edp10f9a5jsn02519910e6ea',
    'x-rapidapi-host': 'YelpAPIserg-osipchukV1.p.rapidapi.com'
  },
  data: {
    accessToken: 'MTYu9GMRnbhzN8gfcyf1uLs0LPmCVRJW9oN6HcoykuuA3gjiE7zK6NQaeW28HVo9o_9QDWWKOC_kYM8sHAGY-MvxucIoibjWWiWM0YEeott4sKllKumNo9vis7uqX3Yx',
    text: 'Burger'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});