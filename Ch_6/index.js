process.env.NODE_ENV = 'develop'
const keys = require('./keys/index.js')
const path = require('path')
const flash = require('connect-flash')
const express = require('express')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const routeHome = require('./routes/routerHome')
const routeCart = require('./routes/routerCart')
const routeCourses = require('./routes/routerCourses')
const routeAdd = require('./routes/routerAdd')
const routeOrders = require('./routes/routerOrders')
const routeAuth = require('./routes/routerAuth')
const varMiddleware = require('./middleware/vareables')
const userMiddleware = require('./middleware/user')
const csrf = require('csurf')

const PORT = process.env.PORT || 3000
const app = express()

//Конфигурация heandlebarse
const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs',
 handlebars: allowInsecurePrototypeAccess(Handlebars),
 helpers: require('./utils/hbs-helpers')
})
//Регистрация движка
app.engine('hbs', hbs.engine)
//Начинаем использовать движек
app.set('view engine', 'hbs')
//Название папки шаблонов (по умолчанию views)
app.set('views', './views')
//Регистрируем публичную папку
app.use(express.static(path.join(__dirname,'public')))
//bufer translate
app.use(express.urlencoded({extended: true}))
const store = new MongoStore({
  collection: 'sessions',
  uri: keys.mongoLoc
})
app.use(session({
  secret: keys.secret,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', routeHome)
app.use('/courses', routeCourses)
app.use('/add', routeAdd)
app.use('/cart', routeCart)
app.use('/orders', routeOrders)
app.use('/auth', routeAuth)

async function start() {
  try {
    await mongoose.connect(keys.mongoLoc, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
      console.log('process.env.NODE_ENV === ', process.env.NODE_ENV);
    })
  } catch (error) {
    console.log(error);
  }
}

start()