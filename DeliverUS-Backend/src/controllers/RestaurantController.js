import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  // 1. Get restaurant from request body
  const newRestaurant = Restaurant.build(req.body)

  // 2. Get user from request
  // newRestaurant.userId = req.user.id // authenticated user
  newRestaurant.userId = 1 // hardcoded user

  // 3.Save restaurant
  try {
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

// FR1: Restaurants listing: Customers will be able to query all restaurants.
// To this end, you can use the Sequelize Model.findAll method.
/*
const index = async function (req, res){
  try{
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
  }
  catch (err){
    res.status(500).send(err)
  }
}
*/

const show = async function (req, res) {
// FR2: Restaurants details and menu: Customers will be able to query restaurants details and the products offered by them.
  try {
    // get specific restaurant by id
    const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: { model: ProductCategory, as: 'productCategory' }
      },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
      order: [[{ model: Product, as: 'products' }, 'order', 'ASC']]
    })
    // Return restaurant
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try {
    // Use the Restaurant.update(nesData, {where: {id: req.params.restaurantId}}) method to update the restaurant.
    await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })
    // Return updated restaurant
    const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
    res.json(updatedRestaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    const destroyedRestaurants = await Restaurant.destroy({
      where: {
        id: req.params.restaurantId
      }
    })
    res.json(destroyedRestaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
