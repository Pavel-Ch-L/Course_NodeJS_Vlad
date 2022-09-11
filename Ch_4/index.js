process.env.NODE_ENV = 'develop'
const keys = require('./keys/index.js')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const routeHome = require('./routes/routerHome')
const routeCart = require('./routes/routerCart')
const routeCourses = require('./routes/routerCourses')
const routeAdd = require('./routes/routerAdd')
const routeOrders = require('./routes/routerOrders')
const User = require('./models/user.js')

const PORT = process.env.PORT || 3000
const app = express()

//Конфигурация heandlebarse
const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs',
 handlebars: allowInsecurePrototypeAccess(Handlebars)
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
app.use(async(req, res, next) => {
  try {
    const user = await User.findById('631daa7084caa1cb55014e63')
    req.user = user
    next()
  } catch (error) {
    console.log(error);
  }
})

app.use('/', routeHome)
app.use('/courses', routeCourses)
app.use('/add', routeAdd)
app.use('/cart', routeCart)
app.use('/orders', routeOrders)

async function start() {
  try {
    await mongoose.connect(keys.mongoLoc, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'pavel@ya.ru',
        name: 'Pavel',
        cart: {items:[]}
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
      console.log('process.env.NODE_ENV === ', process.env.NODE_ENV);
    })
  } catch (error) {
    console.log(error);
  }
}

start()