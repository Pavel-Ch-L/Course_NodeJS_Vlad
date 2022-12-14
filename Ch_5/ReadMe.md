# 5. Практика. Сессии и авторизация
&emsp;  
### 1. Страница логина
	• Добавить views/auth/login.hbs (Tabs из materialize) формы войти и регистрация
	• Создать роутер routerAuth и метод get '/login' отобразить login.hbs 
	• Исправить navbar (добавить пункт 'Войти')
	• Добавить отступы инициализировать табы
	• Добавить формы регистрации и логина из add.hbs  в login.hbs  (auth/register auth/login POST)

### 2. Добавление сессии
<pre>
  В сессии храниться информация об авторизации и конкретном пользователе кот. сохр. в куках и mongoDB.
Данные хранятся внутри req.session. Объект Node.js сессии глобальный и будет перезаписываться данными 
последнего пользователя. Чтобы избежать этого используются хранилища. 
Самыми распространенными хранилищами являются MemCached и Redis.  
Сессия начинается в момент захода на сайт и заканчивается при закрытии вкладки браузера или 
при переходе в пределах текущей вкладки на другой ресурс, и позволяет сохранять, например, 
данные в действиях пользователя, которые не теряются при переходе на другую страницу.
</pre>
	• Добавить в проект express-session в index.js
	• Создать мидлвэр в index.js
	• Созать роут post auth/login c пременоой req.session.isAuthenticated = true  и редирект '/'
	• Создать функцию мидлвэа ./middleware/variables.js кот добавит данные в 
		res.locals.isAuth = req.session.isAuthenticated в каждом ответе сервера.
	• Добавить мидлвэа в index.js
	• В навбар скрыть пункты (добавить курс, корзина, заказы) 
		но показать (войти,  главная, курсы) если isAuth = false
	• В навбар добавить кнопку выйти /auth/logout
	• Обработать в routerAuth get /auth/logout удалить сессию перейти на auth/login#login

### 3. Сохранение сессии
	• Удалить мидлвэа для создания пользователя
	• В auth.js post /login получить пользователя из базы по Id и записать в req.session.user
	• Сохранить сессию с обработкой колбэк функции (редирект)
	• Проверить в F12 cookie (connect.sid)

### 4. Сессия в базе данных
	• npm i connect-mongodb-session (Для хранения сессий в базе данных) подключить после сессии и сконфигурировать в index.js
	• Проверить в compas
	• Исправить видимость ссылок "редактировать", "купить" на стр. courses.hbs

### 5. Защита роутов
<pre>
Хотя ссылки для неавторизованных пользователей скрыты в адресной строке все равно можно по ним зайти.
</pre>
	• Добавить middleware/auth.js проверку авторизации если нет то редирект  /auth/login
	• Добавить защиту в нужные роуты (router.post('/', auth, async(req, res))

### 6. Исправление работы корзины
	• Данные пользователя хранится теперь в сессии но не модель mongoose
	• Создать middleware/user.js для добавления модели mongoose в req.user

### 7. Регистрация пользователя
	• Создать в файле routerAuth post "/register" Проверить есть ли пользователь с таким email (доработать модель
		пользователя добавить поле password string req) исправить шаблон hbs добавив поле 'name', если существует выдать ошибку и 
		редирект на логин, если не существует создать и сохранить пользователя и редирект на логин

### 8. Логин пользователя
	• Редактировать routeAuth post '/login' . Попытаться найти по email если нет редирект на логин если 
		есть сравнить пароль если пароль совпадает записать req.session.user = candidate редирект на главую

### 9. Шифрование пароля
	• Npm install bcryptjs и подключить в roterAuth.js
	• В роуте post '/register' зашифровать пароль
	• В роутере post '/login' исправить валидацию пароля

### 10. Добавление CSRF-защиты
<pre>
CSRF защита нужна для предотвращения отправки данных post форм злоумышленником от лица пользователя.
Мидлвэа проверяет наличие ключа name="_csrf" при отправки формы от клиента
</pre>
	• Npm install csurf подключить в index.js как мидлвэа после подключения сессии, 
		в middleware/variables.js передать в res.locals.csrf = req.csrfToken()
	• Добавить в формы с пост запросами hbs input name="_csrf" value="{{csrf}}"
	• Исправить feth на клиенте  headers: { "X-XSRF-TOKEN": csrf }
	• В файле public/app.js в генерируемой html разметке после удаления товара из 
		корзины также необходимо добавить атрибут data-csrf="${csrf}" для кнопки .js-remove

### 11. Сообщения об ошибке
<pre>
С помощю сессии можно делать транспортировку ошибок при редиректе
</pre>
	• npm install connect-flash подключить в index.js
	• Отредактировать roterAuth.js и auth.hbs (показать сообщение если есть) и стилизовать

### 12. Тестирование пользователей
  •
***
&emsp;
# Информация
	• res.locals - данные кот с каждым ответом отдаются в шаблон
	• Для доступа к корню из {{each}} (res.locals) {{#if @root.isAuth}}
	• M.Tabs.init(document.querySelectorAll('.tabs')) //Инициализация табов
### Express-session подключение
<pre>
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
</pre>
***
### Удалить сессию
<pre>
req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
</pre>
***
### Сохранение сессии
<pre>
req.session.save(err => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
</pre>
***
### Сохранение сессии в mongodb
<pre>
npm i connect-mongodb-session
const MongoStore = require('connect-mongodb-session')(session)

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.mongoLoc
})
</pre>
***
### Шифрование
<pre>
const bcrypt = require('bcryptjs')

hashPassword = await bcrypt.hash(password, 10)
await bcrypt.compare(value, user.password)
</pre>
***
### CSRF токен защита
<pre>
const csrf = require('csurf')
app.use(csrf())
res.locals.csrf = req.csrfToken()
fetch('/cart/remove/' + id, {
        method: 'delete',
        headers: {
          'X-XSRF-TOKEN': csrf
        }
</pre>
***
### Передача ошибок при редиректе
<pre>
const flash = require('connect-flash')

app.use(flash())

req.flash('errorRegister', "Сообщение об ошибке")
error : req.flash('errorRegister')
</pre>
***