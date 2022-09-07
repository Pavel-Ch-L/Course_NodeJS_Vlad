//Необходимо вручную добавить из базы
const user = await User.findById('626e94c0d0e1b3f5e039733a')

//Mongoose (В новых версиях нужно добавлять к запросам .lean())

//Создать соединение
await mongoose.connect(mongoURL, {useNewUrlParser: true})

//Создать модель 
const {Schema, model} = require('mongoose')
module.exports = model('Course', course)

//Конструктор
const course = new Course({})

//Сохранить в базу
await course.save()

//Забрать все курсы из базы
await Course.find()

//Найти по Id
await Course.findById(req.params.id)

//Найти и обновить по id
await Course.findByIdAndUpdate(req.body.id, req.body)

//Удаление и  {условие}
  await Course.deleteOne({
  _id: req.body.id
  })

//Ссылка на другую таблицу
courseId: {
          type: Schema.Types.ObjectId,  // Тип ID
          ref: 'Course',                // Название модели module.exports = model('Course', course)
          required: true
        }  

// Достать значение по ссылке на др таблицу .populate('')
// тж можно выбрать поля Course с помощю .select()  и поля userId c помощю .populate()
const courses = await Course.find().populate('userId', 'email, name').select('price title')        

//Заносим объект user модели mongooose в req.
app.use(async (req, res, next) => {
  const user = await User.findById('62a88ddcf3d198f6faeb9a72')
  req.user = user   
  next()
}     

//Добавить методы для работы с моделью mongooose
userSchema.methods.addToCart = function () {
  this.
}

//Достать курсы из базы по courseId
.populate(['cart.items.courseId'])

//
function mapCartItems(cart) {
  return cart.items.map(c => ({
    ...c.courseId._doc,         //Убрать метаданные
    count: c.count
  }))
}

//Зачем нужен метод
//courseSchema.method('toClient'


//Формат даты (16 июня 2022 г., 22:05:15)
return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    houre: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(date))