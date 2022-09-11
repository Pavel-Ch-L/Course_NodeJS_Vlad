# 4. Практика. База данных MongoDB
&emsp;  
### 1. Подключение к MongoDB
	• Зарегистрироваться, получить адрес подключения MongoDb Atlas по API

### 2.  Установка Mongoose
	• Подкл mongoose + async func start(){}
	• await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

### 3. Создание модели
	• Переписать models/course 
	• Переписать routesrAdd - router.post('/'   )

### 4. Переписываем модель
	• Переписать routes/courses - router.get('/')
	• Переписать routes/courses - router.get('/:id/edit')
	• Переписать routes/courses - router.get('/:id')
	• Переписать routes/courses - router.post('/edit')

### 5. Удаление курса
	• Редактировать views/course-edit - <form action='/courses/remove method='post'> + button + id
	• Добавить routes/courses - router.post('/remove')
	• Поправить разметку

### 6. Модель пользователя
	• Создать файл models/user.js (модель пользователя) emai: string req, name: string req, cart: {items: [ {count: {number req def=1}, courseId: {type: Schema.Types.ObjectId, ref: 'Course', req} } ]

### 7. Добавление пользователя
	• В index.js создать и сохранить пользователя в базе если его еще нет
	• Создать мидлвэа для присутствия user в req запросах
	• Дописать модель Course добавить userId: {type: Schema.Types.ObjectId, ref: 'user'}
	• Исправить роут add (post'/') добавив в new Course {userId: req.user}

### 8. Добавление товара в корзину
	• Удалить папку data и модель cart 
	• Исправить подключения модулей Cart после удаления
	• Редактировать роут cart add '/' post
	• Добавить функционал в models/user userSchema.methods.addToCart

### 9. Отображение корзины
	• Отредактировать роут cart get '/' 
	• Создать вспомогательные функции mapCartItems(для получения массива курсов без метаданных), computePrice(вычисление общей стоимости) 
	• Получить в виде cart={courses[{}], price: 0)
	• Вывести состояние корзины на экран

### 10. Удаление из корзины
	• Редактировать роут cart delete  (учитывая что в шаблоне cart id дб _id  см пункт 11 ниже)
	• Добавить функцию removeFromCart(courseId) в models/user
	• В роутере cart получить данные пользователя и представить их в виде нативного объекта
	• Передать данные на фронтенд

### 11. Трансформация данных на клиенте
	• В роутере cart исправить метод mapCartItems()  для преобразования _id => id

### 12. Подготовка страницы заказов
	• Добавить в views/cart.hbs (form '/orders/' + btn cделать заказ)
	• Редактировать navbar '/orders'
	• Добавить файл rotes/orders.js
	• Редактировать index.js новый роут
	• Добавить в роутер get '/'
	• Добавить в views/orders.hbs <h1>
	• Добавить в роутер post '/'
	• Создать модель orders.js {courses[ {course, count} ], user: {name, userId}, date } 

### 13. Получение данных заказов
	• Дописать роутер post '/orders' (получить курсы из корзины в формате [ {count, course: {}}, … ]), создать модель Order
	• Сохранить модель Order
	• Очистить корзину clearCart() в user.schema
	• Дописать роутер get '/orders' (получить все ордеры пользователя, вернуть на фронтенд orders: [ {…order, price} ] )

### 14. Вывод заказов
	• Редактировать orders.hbs ( вывести если есть, id заказа, дата, пользователь (name, email), список: курс - количество, цена)
	• Форматировать дату в шаблоне orders.hbs
***
&emsp;
# Информация  
***
	• Перед запуском с новой базой заменить userId в index.js стр. 37 (взять из новой базы)
***
	• course.save() //Сохранить в базу
	• .lean()
	• Course.find() //Забрать все курсы из базы
	• Course.findById(req.params.id) Найти по Id
	• Course.findByIdAndUpdate(id, req.body) //Найти и обновить по id
	• Course.findByIdAndRemove( {_id: req.body.id} ) //Найти и удалить по id
	• await Course.deleteOne( {_id: req.boby.id} ) //Найти и удалить по условию
	• Course.find().lean().populate('userId', 'email name').select('title price') // выбрать поля Course 
		с помощю .select() и поля userId c помощю .populate()
	• await req.user.populate(['cart.items.courseId']) // Достать значение по ссылке на др таблицу .populate('')
	• return cart.items.map(c => ( {...c.courseId._doc, count: c.count} )) //_doc без метаданных
	• c.courseId._id.toString() === id  // Привести _id к строке
	• [...this.cart.items] //Клонирование массива
***
### Строка подключения к базе
<pre>
await mongoose.connect(keys.mongoLoc, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false
})
</pre>
***
### Ошибка handlebars вывод ID первый способ
<pre>
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})</pre>
***
### Ошибка handlebars вывод ID второй способ
<pre>
const mongooseLeanId = require('mongoose-lean-id')
course.plugin(mongooseLeanId) //В модели
</pre>
***
### Форматирование даты
<pre>
new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  month: 'long',
  year: 'numeric'
}).format(new Date(date))
</pre>
***
### Заносим объект user модели mongooose в req.
<pre>
app.use(async (req, res, next) => {
  const user = await User.findById('62a88ddcf3d198f6faeb9a72')
  req.user = user   
  next()
}
</pre>
***