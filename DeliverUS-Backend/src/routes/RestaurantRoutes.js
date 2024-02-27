import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  // FR1: Restaurants listing: Customers will be able to query all restaurants.
  app.route('/restaurants').get(RestaurantController.index)
  // FR2: Restaurants details and menu: Customers will be able to query restaurants details and the products offered by them.
  app.route('/restaurants/:restaurantId').get(RestaurantController.show)

  // FR1: To Create, Read, Update and Delete (CRUD) Restaurants: Restaurantes are related to an owner,
  // so owners can perform these operations to the restaurants owned by him. If an owner creates a Restaurant,
  // it will be automatically related (owned) to him.
  app.route('/restaurants').post(RestaurantController.create).get(RestaurantController.index)
  app.route('/restaurants/:restaurantId').put(RestaurantController.update).delete(RestaurantController.destroy)
}
export default loadFileRoutes
