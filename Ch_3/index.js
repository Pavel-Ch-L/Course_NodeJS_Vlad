const express       = require('express')
const path          = require('path')
const exphbs        = require('express-handlebars')
const routeHome     = require('./routes/routerHome')
const routeCart     = require('./routes/routerCart')
const routeCourses  = require('./routes/routerCourses')
const routeAdd      = require('./routes/routerAdd')

const PORT  = process.env.PORT || 3000
const app   = express()

//Конфигурация heandlebarse
const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs'
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

app.use('/', routeHome)
app.use('/courses', routeCourses)
app.use('/add', routeAdd)
app.use('/cart', routeCart)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
})
