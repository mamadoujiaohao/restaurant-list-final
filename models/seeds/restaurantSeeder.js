const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurants =  require('../../restaurant.json').results

db.once('open', () => {
    console.log('adding seed data')
    Restaurant.create(restaurants)
    .then(() => {console.log('done')
    db.close()})
})