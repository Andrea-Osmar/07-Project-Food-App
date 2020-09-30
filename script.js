const restaurants = document.getElementsByClassName('restaurant');
const cityId = '89';
const cuisineId = '25';
// la till två ytterligares sökparametrar som finns i api:et
const sort = 'rating';
const order = 'desc';
const API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}`;
const API_URL_SORT = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}&sort=${sort}&order=${order}`;
console.log(API_URL_SORT);
const API_KEY = `43d79a2b3a262a9d099962eba283ced8`;

const request = new Request(API_URL, {
  headers: new Headers({
    Accept: 'application/json',
    'user-key': API_KEY,
  }),
});

const fetchRestaurants = () => {
  fetch(request) //we use the request object and pass it in to the fetch-function (instead of the URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      let restaurantArray = json.restaurants;
      console.log(restaurantArray);
      let filteredNewArray = filteredPriceRange(json, 1);
      console.log(filteredNewArray);
      filteredNewArray = filteredNewArray.map(restaurantInformation);
      console.log(filteredNewArray);

      //map
      const newArray = json.restaurants.map(restaurantInformation);

      // console.log(newArray);
      newArray.forEach(generateHTML);

      newArray.forEach((item, index) => {
        console.log(restaurants[index]);
        restaurants[index].querySelector('.rest-name').innerText =
          item.restName;
        restaurants[index].querySelector('.rest-address').innerText =
          item.restAddress;
        restaurants[index].querySelector('.rest-average-cost').innerText =
          item.averageCost;
        restaurants[index].querySelector('.rest-rating').innerText =
          item.averageRating;
        restaurants[index].querySelector('.rest-picture').src = item.image;
      });
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
  console.log(json);
  console.log(range);
  const filteredNewArray = json.restaurants.filter(
    (item) => item.restaurant.price_range === range
  );
  console.log(filteredNewArray);
  return filteredNewArray;
};

// la till funktion för att generera HTML. Funkar förutom att bild bara läggs till på den första restaurangen
const generateHTML = (restaurantArray) => {
  const imageSrc = restaurantArray.image;
  console.log(imageSrc);
  let restaurantArticle = `<article class="restaurant">`;
  restaurantArticle += `<div>`;
  restaurantArticle += `<h1 class="rest-name">${restaurantArray.restName}</h1>`;
  restaurantArticle += `<p class="rest-address">${restaurantArray.restAddress}</p>`;
  restaurantArticle += `<p class="rest-average-cost">${restaurantArray.averageCost}</p>`;
  restaurantArticle += `<p class="rest-rating">${restaurantArray.averageRating}</p>`;
  restaurantArticle += `</div>`;
  restaurantArticle += `<div>`;
  restaurantArticle += `<img class="rest-picture" id="rest-picture" />`;
  restaurantArticle += `</div>`;
  restaurantArticle += `</article>`;
  document.getElementById('wrapper').innerHTML += restaurantArticle;
  // console.log(document.getElementById('rest-picture'));
  document.getElementById('rest-picture').src += imageSrc;
  // console.log(document.getElementById('rest-picture').src);
};
