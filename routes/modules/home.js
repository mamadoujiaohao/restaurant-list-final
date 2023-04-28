const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
    Restaurants.find()
      .lean()
      .sort({name: 'asc'}) //or desc
      .then((restaurant) => {res.render('index',{restaurant})})
      .catch(error => console.error(error))
})

module.exports = router