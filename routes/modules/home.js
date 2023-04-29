const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Restaurants.find({ userId })         // 加入查詢條件
    .lean()
    .sort({name: 'asc'}) 
    .then((restaurant) => {res.render('index',{restaurant})})
    .catch(error => console.error(error))
  })

module.exports = router