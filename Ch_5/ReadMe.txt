5. Практика. Сессии и авторизация

-----------------------------------------------------------
express-session

app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
-----------------------------------------------------------
res.locals - данные кот с каждым ответом отдаются в шаблон
-----------------------------------------------------------
Удалить сессию

req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
-----------------------------------------------------------
Сохранение сессии

req.session.save(err => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
-----------------------------------------------------------
Сохранение сессии в mongodb

npm i connect-mongodb-session
const MongoStore = require('connect-mongodb-session')(session)

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.mongoLoc
})

-----------------------------------------------------------
Для доступа к корню из {{each}} (res.locals)
{{#if @root.isAuth}}
-----------------------------------------------------------
Шифрование

const bcrypt = require('bcryptjs')
hashPassword = await bcrypt.hash(password, 10)
await bcrypt.compare(value, user.password)
-----------------------------------------------------------
CSRF токен защита

const csrf = require('csurf')
app.use(csrf())
res.locals.csrf = req.csrfToken()
fetch('/cart/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        }
-----------------------------------------------------------
Передача ошибок при редиректе

const flash = require('connect-flash')
app.use(flash())
req.flash('errorRegister', "Сообщение об ошибке")
error : req.flash('errorRegister')
-----------------------------------------------------------
-----------------------------------------------------------