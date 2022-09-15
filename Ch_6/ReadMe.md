# 6. Практика. Работа с Email
&emsp;  
### 1. Объект конфигурации
	• Cоздать keys/index.js объект конфигурации. Вынести переменные в конфиг

### 2. Настройка почтового сервиса
	• https://sendinblue.com
	
### 3. Отправка письма
	• const SibApiV3Sdk = require('sib-api-v3-sdk')
	• Написать emails/mailTranport.js модуль транспортер function принимающая объект письма\
	• Написать модуль emails/registration.js принимающий email name пользователя и возвращающей объект письма
	• При регистрациинового пользователя отправить письмо после редиректа

### 4. Восстановление пароля
<pre>
Генерируем ключ кот записываем пользователю в базу затем отправляем в письме пользователю этот ключ, 
пользователь перейдет по ссылке в письме на страницу где мы проверим совпадает ли ключ и время жизни, 
если совпадает то меняем пароль
</pre>
	• Создать файл views/auth/reset.hbs скопировать из auth/login.hbs 
		и отредактировать <form auth/reset method='post'></form> 
	• Добавить ссылку в auth/login.hbs 'Восстановить пароль' href='/auth/reset'
	• Написать роутер в routerAuth.js get '/reset'  отобразить auth/reset.hbs
	• В roterAuth.js подключить crypto (модуль из express) для генерации произвольного ключа
	• Создать модуль письма emails/reset добавить токен как параметр адресной строки в ссылку восстановления
	• Написать роутер в routerAuth.js post '/reset'  , сгенерировать ключ, 
		попытаться найти candidate в базе по email, добавить в модель user resetToken: String, 
		resetTokenExp: Date, добавить поля в candidate(время жизни токена 1ч), candidate.save(), 
		отправить письмо, редирект /auth/login

### 5. Страница нового пароля
	• Создать views/auth/password.hbs из reset.hbs. Добавить два инпута userId, token + csrf
	• Создать новый роут roterAuth get '/auth/password/:token ' где проверить наличие пользователя в базе 
		с таким токеном и не истекшим временем действия. Если пользователь есть то отобразить страницу 
		password.hbs и предать в нее userId.toString(), token, если нет auth/login

### 6. Изменение пароля
	• В routes/routerAuth создать обаботчик post '/password'  найти пользователя в бд с таким же Id  
		resetToken  resetTokenExp Если есть заменить пароль (предварительно зашифровать), 
		сбросить токены и сделать редирект /login.    Если нет req.flash('error, '') redirect /login

### 7. Рефакторинг по правам доступа
	• Разрешить редактировать курсы только тому пользователю кот их создавал (убрать ссылку для 
		чужого пользователя и проверить доступ на бэкенде)
	• При отображении курсов передавать в шаблон userId : req.user ?  req.user._Id.toString() : null
	• Убрать ссылку редактировать для чужого пользователя. Hbs не умеет проверять на 
		равенство поэтому нужно создать диррективу.
	• Защитить роуты get courses/:id/edit,   post /edit (При нажатии кнопки "Редактировать" 
		сравнить id текущего пользователя и id пользователя кот создал курс)

### 8. Защита удаления
	• Защитить удаление, дописав свойство Course.deleteOne({}) кот проверяет userId : req.user._id

***
&emsp;
# Информация
### Транспортер почты
	• const SibApiV3Sdk = require('sib-api-v3-sdk')
***
### Шифрование в express (генерация произвольного ключа)
<pre>
const crypto = require('crypto')
crypto.randomBytes(32, async(err, buffer) => {
  buffer.toString('hex')
})
</pre>
***
### Добавить 1 час к текущей дате
	• candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
***
### Поиск по условию в mongodb
<pre>
const user = await User.findOne({
  resetToken: req.params.token,
  resetTokenExp: {$gt: Date.now()} // если $gt больше чем текущая дата
})
</pre>
***
### Шифрование
	• const bcrypt = require('bcryptjs')
	• user.password = await bcrypt.hash(req.body.password, 10)
***
### Дирректива hendlebars
<pre>
const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs',
 handlebars: allowInsecurePrototypeAccess(Handlebars),
 helpers: require('./utils/hbs-helpers')
})
</pre>
***