7. Практика. Валидация и файлы

---------------------------------------------
Подключение валидатора первый способ

const {body, validationResult} = require('express-validator/check')

router.post('/register', body('email').isEmail(), async(req, res) => ...
const errors = validationResult(req)
    if(!errors.isEmpty()) {
      req.flash('errorRegister', errors.array()[0].msg)
      return res.status(422).redirect('/auth/login#register')
    }
---------------------------------------------
Отключить валидацию формы на фронтенде

<form action="/auth/login" method="post" novalidate>
---------------------------------------------
Подключение валидатора второй способ

создать мидлвэа utils/validators

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите корректный Email'),
]
---------------------------------------------
Sanitaizers Улучшение данных пользователя

.trim()
.normalizeEmail()
---------------------------------------------
Для работы с загрузкой файлов

npm install multer

---------------------------------------------
Дла загрузки файла на сервер

<form action="/profile" method="post" enctype="multipart/form-data">
---------------------------------------------
---------------------------------------------
---------------------------------------------