const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

//search function
router.get('/', (req, res) => {
    const keyword = req.query.keyword
    const keywords = keyword.trim().toLowerCase()
    Restaurants.find({})
      .lean()
      .then((restaurantList)=>{
        const restaurants = restaurantList.filter(data => {
        return data.name.toLowerCase().includes(keywords) //|| data.category.includes(keyword)
        })
        res.render('index', { restaurant: restaurants, keyword: keyword })
      })
      .catch(error => console.error(error))
})

module.exports = router