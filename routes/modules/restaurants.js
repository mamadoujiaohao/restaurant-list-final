const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

//new page(should be upper)
router.get('/new', (req, res) => {
    return res.render('new')
})
  
router.post('/', (req, res) => {
    const userId = req.user._id
    const {name ,name_en,category,image,location,phone,google_map,rating,description} = req.body
    Restaurants.create({name,name_en,category,image,location,phone,google_map,rating,description, userId})
        .then(() => {res.redirect('/')})
        .catch(error => console.error(error))
})

  //show pages(should be lower)
router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurants.findOne({_id, userId})
    .lean()
    .then((restaurant) => {res.render('show', {restaurant})})
    .catch(error => console.error(error))
})

  //edit page
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurants.findOne({_id, userId})
    .lean()
    .then((restaurant) => {res.render('edit', {restaurant})})
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
    return Restaurants.findOne({_id, userId})
    .then((restaurant) => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
    })
    .then((restaurant) => {res.redirect(`/restaurants/${id}`)})
    .catch(error => console.error(error))
})

//delete function
router.delete('/:id', (req,res) => {
    const userId = req.user._id
    const _id = req.params.id
    return Restaurants.findOne({_id, userId})
    .then(restaurant => {
        restaurant.deleteOne()})
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


module.exports = router