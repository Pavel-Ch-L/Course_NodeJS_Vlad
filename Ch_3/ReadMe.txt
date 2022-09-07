//Разбор req.body (у каждого <input> д.б. атрибут name)
app.use(EXPRESS.urlencoded({extended: true}))
------------------------------------------------------
//:id динамический параметр находится в req.params.id. Создается новый layout
router.get('/:id', async(req, res) => {
  const course = await Course.getById(req.params.id)
    if(course) {
      res.render('course', {
      layout: 'empty',
      title: `Курс ${course.title}`,
      course
    })
------------------------------------------------------
// объект, содержащий все GET-параметры;
req.query.allow

//параметры маршрутизации в виде объекта;
req.params 

//объект, который хранит данные, передаваемые POST или PUT запросом;
req.body
------------------------------------------------------
//точка входа текущего приложения 
path.join(path.dirname(require.main.filename), 
------------------------------------------------------
//возвращает имя каталога
path.dirname
------------------------------------------------------
//Деструкция и возврат из функции
candidate = (({title, price, id}) => ({title, price, id}))(course)
------------------------------------------------------
//Форматирование чисел
Intl.NumberFormat
------------------------------------------------------
Два пробела — введите &ensp;
Четыре пробела — введите &emsp;
------------------------------------------------------
[{"title":"JS !","price":"10000","img":"https://s3.amazonaws.com/media-p.slid.es/uploads/875951/images/4895272/js-logo.png","id":"c791cb6f-dd26-4574-af02-1044b163d874"},{"title":"VUE !","price":"20000","img":"https://wikilogo.net/storage/logos/vue-js-1.svg","id":"830ccdca-1281-4360-aaee-c34d1f242806"}]