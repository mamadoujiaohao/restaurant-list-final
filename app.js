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
    const keyword = req.query.keyword
    const keywords = keyword.trim().toLowerCase()
    Restaurants.find({})
      .lean()
      .then((restaurantList)=>{
        console.log(keywords)
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