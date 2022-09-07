4. Практика. База данных MongoDB
-----------------------------------------------------
await mongoose.connect(keys.mongoLoc, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
-----------------------------------------------------
course.save()
.lean()
Course.find()
Course.findById(req.params.id)
Course.findByIdAndUpdate(id, req.body)
Course.findByIdAndRemove( {_id: req.body.id} )
await Course.deleteOne( {_id: req.boby.id} )
Course.find().lean().populate('userId', 'email name').select('title price')
await req.user.populate(['cart.items.courseId'])
return cart.items.map(c => ( {...c.courseId._doc, count: c.count} ))
c.courseId._id.toString() === id
-----------------------------------------------------
Ошибка handlebars вывод ID первый способ

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs',
 handlebars: allowInsecurePrototypeAccess(Handlebars)
})
-----------------------------------------------------
Ошибка handlebars вывод ID второй способ

const mongooseLeanId = require('mongoose-lean-id')
course.plugin(mongooseLeanId)
-----------------------------------------------------
Картинки курсов
https://tuhbm.github.io/images/bnr-vue.jpg
https://cdn.imgbb.ru/preview/r/haKbE6AWBttVUtLgdid8kg/720x-/user/328/3282175/201911/6cc743aac681be72cff2587ed879ceb0.jpg
-----------------------------------------------------
4 пробела
&emsp;
-----------------------------------------------------
Форматирование даты

new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
-----------------------------------------------------
-----------------------------------------------------
-----------------------------------------------------