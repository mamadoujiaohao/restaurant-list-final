const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants =  require('../../../restaurant.json')

db.once('open', () => {
    Restaurant.create(restaurantList)
   
})