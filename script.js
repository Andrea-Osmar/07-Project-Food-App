const restaurants = document.getElementsByClassName("restaurant");
const cityId = "89";
const cuisineId = "25";
const API_URL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&count=10&cuisines=${cuisineId}`;
const API_KEY = `cbcee325a3269e2c9a64a70beb91d113`;

const request = new Request(API_URL, {
  headers: new Headers({
    Accept: "application/json",
    "user-key": API_KEY,
  }),
});

const fetchRestaurants = () => {
  fetch(request) //we use the request object and pass it in to the fetch-function (instead of the URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      //map
      const newArray = json.restaurants.map(restaurantInformation);

      console.log(newArray);
      newArray.forEach((item, index) => {
        restaurants[index].querySelector(".rest-name").innerText =
          item.restName;
        restaurants[index].querySelector(".rest-address").innerText =
          item.restAddress;
        restaurants[index].querySelector(".rest-average-cost").innerText =
          item.averageCost;
        restaurants[index].querySelector(".rest-rating").innerText =
          item.averageRating;
        restaurants[index].querySelector(".rest-picture").src = item.image;
      });
    });
};
fetchRestaurants();

const restaurantInformation = (information) => {
  const restName = information.restaurant.name;
  const restAddress = information.restaurant.location.address;
  const averageCost =
    information.restaurant.average_cost_for_two +
    " " +
    information.restaurant.currency;
  const averageRating = information.restaurant.user_rating.aggregate_rating;
  const image = information.restaurant.featured_image;
  return { restName, restAddress, averageRating, averageCost, image };
};
