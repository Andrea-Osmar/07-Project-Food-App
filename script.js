const restaurants = document.getElementsByClassName('restaurant');
const cityId = '89';
const cuisineId = '25';
const API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}`;
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
      let filteredNewArray = filteredPriceRange(json, 3);
      console.log(filteredNewArray);
      //filteredNewArray = filteredNewArray.map(restaurantInformation);
      console.log(filteredNewArray);

      //map
      const newArray = json.restaurants.map(restaurantInformation);

      // console.log(newArray);
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
  const filteredNewArray = json.restaurants.filter(
    (item) => item.restaurant.price_range === range
  );
  console.log(filteredNewArray);
  return filteredNewArray;
};
