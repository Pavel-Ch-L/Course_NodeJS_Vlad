# 7. Практика. Валидация и файлы
&emsp;  
### 1. Базовая валидация
	• npm install express-validator
	• routes/routerAuth.js post '/register' проверить email обработать ошибки

### 2. Валидация регистрации
	• Создать utils/validators.js перенести сюда уже созданный валидатор email
	• Дописать валидаторы для password passwordConfirm (кастомный валидатор) и name

### 3. Асинхронные валидаторы
	• utils/validators email добавить кастомный асинхронный валидатор 
	• Исправить routeAuth.js post '/register'

### 4. Улучшение данных
	• Отредактировать validators.js добавив sanitaizers

### 5. Валидация курсов
	• Добавиь валидацию для формы post /login
	• Написать новый валидатор для страницы добавления новых курсов (exports.courseValidators)
	• Отредактировать  routerAdd.js post '/'  courses.js post /edit
	• Добавить в add.hbs параграф error если есть

### 6. Обработка 404 ошибки
	• Создать мидлвэа middleware/error.js для обработки 404 ошибки + шаблон views/404.hbs
	• Подключить в index.js

### 7. Создание страницы профиля
	• Создать файл views/profile.hbs (form enctype: multipart/form-data), rotes/roterProfile.js создать роуты get '/' post '/'
	• Подключить в Index.js
	• Исправить navbar.hbs

### 8. Настройка загрузки файлов
	• npm install multer
	• Создать middleware/file.js подключить перед csrf в index.js

### 9. Загрузка файлов
	• Подключить валидатор auth в routeProfile get post
	• В модели user добавить поле avatarUrl: String
	• В шаблоне profile.hbs проверить наличие user.avatarUrl показать картинку если нет параграф
	• Дописать роут post '/' (получить пользователя по id, написать свойство toChange{name: }, 
		проверить если req.file=true то toChange.avatarUrl = req.file.path, добавить свойство 
		toChange в user (Object.assign(user, toChange)), user.save())
	• Исправить модель User (добавить поле avatarUri: String)
	• Создать папку images, сделать ее статический + ('/images' добавить в путь)

***
&emsp;
# Информация
### Подключение валидатора первый способ
<pre>
const {body, validationResult} = require('express-validator/check')

router.post('/register', body('email').isEmail(), async(req, res) => ...
const errors = validationResult(req)
    if(!errors.isEmpty()) {
      req.flash('errorRegister', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
</pre>
***
### Подключение валидатора второй способ
<pre>
создать мидлвэа utils/validators

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите корректный Email'),
]
</pre>
***
### Отключить валидацию формы на фронтенде
	• <form action="/auth/login" method="post" novalidate>
***
### Sanitaizers Улучшение данных пользователя
	• .trim()
	• .normalizeEmail()
***
### Для работы с загрузкой файлов
	• npm install multer
***
### Дла загрузки файла на сервер
	• <form action="/profile" method="post" enctype="multipart/form-data">
***