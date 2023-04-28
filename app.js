//require package used in the project
const express = require('express')
const app = express() //試試看跟上面統一
const exphbs = require('express-handlebars')
const Restaurants = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
//const usePassport = require('./config/passport')
const flash = require('connect-flash')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const routes = require('./routes')
require('./config/mongoose')

// setting template engine
app.engine('hbs', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'hbs')

//define server related variables
const port = process.env.PORT

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended:true }))

//handle request and response here
//index page
app.get('/', (req, res) => {
    Restaurants.find()
      .lean()
      .then((restaurant) => {res.render('index',{restaurant})})
      .catch(error => console.error(error))
})


//new page(should be upper)
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
   Restaurants.create({name,name_en,category,image,location,phone,google_map,rating,description})
  .then(() => {res.redirect('/')})
  .catch(error => console.error(error))
})

//show pages(should be lower)
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => {res.render('show', {restaurant})})
    .catch(error => console.error(error))
})

//edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .lean()
    .then((restaurant) => {res.render('edit', {restaurant})})
    .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const {name,name_en,category,image,location,phone,google_map,rating,description} = req.body
  return Restaurants.findById(id)
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
app.post('/restaurants/:id/delete', (req,res) => {
  const id = req.params.id
  return Restaurants.findById(id)
    .then(restaurant => {
      restaurant.deleteOne()})
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//search function
app.get('/search', (req, res) => {
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
  

//start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})