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
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//define server related variables
const port = process.env.PORT

// setting static files
app.use(express.static('public'))

//handle request and response here
//index page
app.get('/', (req, res) => {
    Restaurants.find()
      .lean()
      .then((restaurant) => {res.render('index',{restaurant})})
      .catch(error => console.error(error))
})

//show pages
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurants.findById(id)
      .lean()
      .then((restaurant) => {res.render('show', {restaurant})})
      .catch(error => console.error(error))
})

//search function
app.get('/search', (req, res) => {
    Restaurants.find({})
      .lean()
      .then((restaurantList)=>{
        const keyword = req.query.keyword.trim().toLowerCase()
        const restaurants = restaurantList.filter(restaurant => {
        restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword.toLowerCase())
        })
        res.render('index', { restaurants: restaurants, keyword: keyword })
      })
      .catch(error => console.error(error))
    // const restaurants = restaurantList.results.filter(restaurant => {
    //   return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    // })
    //res.render('index', { restaurants: restaurants, keyword: keyword })
})
  

//start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})