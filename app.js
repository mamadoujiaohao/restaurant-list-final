//require package used in the project
const express = require('express')
const app = express() //試試看跟上面統一
const exphbs = require('express-handlebars')
const Restaurants = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const routes = require('./routes')//express自動找index.js
require('./config/mongoose')

// setting template engine
app.engine('hbs', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'hbs')

//define server related variables
const port = process.env.PORT

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(methodOverride('_method'))
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninstalize: true}))
usePassport(app)


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})
  
//routes
app.use(routes)

//start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})