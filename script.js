/*** VARIABLES ***/

const cityId = '89';
const cuisineId = '25';
const sort = 'rating';
const order = 'desc';
const API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}`;
const API_URL_SORT = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}&sort=${sort}&order=${order}`;
const API_KEY = `43d79a2b3a262a9d099962eba283ced8`;

/*** FUNCTIONS ***/

const request = new Request(API_URL, {
  headers: new Headers({
    Accept: 'application/json',
    'user-key': API_KEY,
  }),
});

const fetchRestaurants = (range) => {
  fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let restaurantArray = json.restaurants;
      let newArray;
      if (range === 1 || range === 2 || range === 3) {
        newArray = filteredPriceRange(json, range);
        newArray = newArray.map(restaurantInformation);
        document.getElementById('wrapper').innerHTML = '';
      } else {
        newArray = json.restaurants.map(restaurantInformation);
      }
      newArray.forEach(generateHTML);
    });
};
fetchRestaurants();

const restaurantInformation = (information) => {
  const restName = information.restaurant.name;
  const restAddress = information.restaurant.location.address;
  const averageCost =
    information.restaurant.average_cost_for_two +
    ' ' +
    information.restaurant.currency;
  const averageRating = information.restaurant.user_rating.aggregate_rating;
  const image = information.restaurant.featured_image;
  return { restName, restAddress, averageRating, averageCost, image };
};

const filteredPriceRange = (json, range) => {
  const filteredNewArray = json.restaurants.filter(
    (item) => item.restaurant.price_range === range
  );
  return filteredNewArray;
};

const generateHTML = (restaurantArray) => {
  let restaurantArticle = `<article class="restaurant">`;
  restaurantArticle += `<div>`;
  restaurantArticle += `<h1 class="rest-name">${restaurantArray.restName}</h1>`;
  restaurantArticle += `<p class="rest-address">${restaurantArray.restAddress}</p>`;
  restaurantArticle += `<p class="rest-average-cost">${restaurantArray.averageCost}</p>`;
  restaurantArticle += `<p class="rest-rating">${restaurantArray.averageRating}</p>`;
  restaurantArticle += `</div>`;
  restaurantArticle += `<div class="rest-picture" id="rest-picture">`;
  //restaurantArticle += `<img class="rest-picture" id="rest-picture" />`;
  restaurantArticle += `</div>`;
  restaurantArticle += `</article>`;
  document.getElementById('wrapper').innerHTML += restaurantArticle;
  let imageURL = "url('" + restaurantArray.image + "')";
  console.log(imageURL);
  // console.log(document.getElementById('rest-picture'));
  document.getElementById('rest-picture').style.backgroundImage = imageURL;
  // console.log(document.getElementById('rest-picture').src);
};
