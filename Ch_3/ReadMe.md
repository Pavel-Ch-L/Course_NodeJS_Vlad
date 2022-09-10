# 3. Практика. Express.js
&emsp;  
### 1. Настройка приложения
	• Создать проект npm Init -y
	• Установить express, nodemon
	• Создать файл index.js
	• Настроить express, PORT, скрипты (npm run dev)

### 2. Работа с HTML-файлами
	• app.get('/', (req,res)=>{res. status(200) res.sendFile()})
	• Создать папку views
	• Создать две страницы с перекрестными ссылками

### 3. Подключение Handlebars
	• Движки для создания HTML (pug, ejs, handlebars)
	• Подключить handleBars и настроить
	• app.get('/', (req,res)=>{res.render('about')})
	• Создать папку views/layouts и файл main.hbs

### 4. Настройка Layout
	• Переписать предыдущий пример (с учетом head footer )
	• Создать папку views/partials и перенастроить приложение
	• Подключить materialize.css
	• Обернуть в .container {{{body}}}

### 5. Добавление навигации
	• Добавить navbar.hbs отредактировать меню' 'Главная' 'Курсы' 'Добавить курс'
	• Сделать отступы в меню (создать папку public)
	• app.use(express.static('public'))

### 6. Рендеринг данных
	• Подсветить активные ссылки в меню
	• Создать динамический title
	• Создать страницы во views/ courses.hbs, add.hbs, home.hbs

### 7. Регистрация роутов
	• Создать папку /routes
	• Настроить роутинг и префиксы

### 8. Обработка формы
	• Создать форму на странице add.hbs (action='/add' method='post')
	• Добавить разметку из materialize/forms/textInput  + валидацию (title, price, img )
	• Добавить кнопку 'Добавить курс'
	• Добавить мидлвэр app.use(express.urlencoded({extanded: true})
	• Обработать post запрос в роутере addRoute вывести в консоль данные

### 9. Создание модели
	• Создать папку models/course.js
	• Подключить uuid
	• Доработать роутер addRoute
	• Cоздать класс Course и конструктор с полем id
	• Создать метод Save()
	• Создать папку data и файл courses.json []
	• Создать метод getAll()
	• Создать метод создания объекта toJson()
	• Проверить работу функций в log
	• После добавления курса перейти на стр courses

### 10. Вывод списка курсов
	• Написать роурер coursesRoutes
	• Вывести все курсы на страницу courses.hbs если они есть (materialize Cart)
	• Добавить ссылку на стр курсов 'открыть курс' href='/courses/{{id}}'

### 11. Подключение клиентских скриптов
	• Форматировать цену (Intl.numberFormat) + fz 2rem

### 12. Динамические параметры
	• Cоздать файл course.hbs (title img price)
	• Добавить новые стили (все по центру, ширину img, price)
	• Обработать нажатие 'открыть курс' в новом layouts/empty (без навбар и контейнера) на нов странице
	• Создать функцию getById()  в models/course.js и роутинг в courses.js

### 13. Редактирование курса
	• Добавит новую ссылку на стр "Курсы" 'Pедактировать' courses/id/edit?allow=true
	• Добавить новый роут get courses/:id/edit c проверкой query params если нет то переход на гл стр
		если есть отобразить course-edit с заполнеными полями
	• Добавить во views файл course-edit (копировать из add action='courses/edit post)
	• Добавить роут courses/edit post (при нажатии редактировать на стр course-edit)
	с методом update() и затем перейти на стр курсов
	• Создать метод update() в models/courses
	• Проверить работу

### 14. Подготовка корзины
	• Добавить форму-кнопку на стр courses 'Добавить курс' action='cart/add' post + input  id
	• Исправить верстку на стр courses.hbs
	• Создать файл routes/cart.js + обработать post запрос /add
	• Создать models/cart.js класс Cart
	• В роутере /add вызвать ветод Cart.add() затем перейти в корзину
	• В роутере обработать get cart/ вывести все в корзине методом Cart.fetch()
	• Создать файл views/cart.hbs
	• Добавить в навбар ссылку на корзину
	
### 15. Модель корзины
	• Реализовать Cart.add() Cart.fetch()
	• Использовать в пути require.main.filename
	• Добаить count к курсам в корзине JSON
	• Создать data/cart.json {"courses": [], "price": 0}

### 16. Вывод данных в корзине
	• Создать шаблон корзины если есть
	• Создать таблицу Название количество действие
	• Добавить кнопку Удалить с атрибутом data-id и классом js-remove
	• Добавиь после таблицы общую цену

### 17. Обработка асинхронных запросов
	• Исправить путь к pablic
	• Обработать скриптом кнопку Удалить если есть (получить id вызвать  Fetch() cart/remove/id method delete
	• Реализовать метод remove в cart.js и в роутере delete и отправить данные назад
	• Вывести в консоль

### 18. Динамическое изменение корзины
	• Повторить логику шаблона в js (если есть то таблица если нет сообщение)
	• Исправить форматирование цены
	• Вывести данные о корзине на страницу
***
&emsp;  
# Информация
* Разбор req.body (у каждого \<input> д.б. атрибут name)
* app.use(EXPRESS.urlencoded({extended: true}))
* req.params.id     /:id динамический параметр 
* req.query.allow   объект, содержащий все GET-параметры 
* req.body          объект, который хранит данные, передаваемые POST или PUT запросом 
***
### Создается новый layout
<pre>router.get('/:id', async(req, res) => {
  const course = await Course.getById(req.params.id)
  if(course) {
    res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  })</pre>
***
### Точка входа текущего приложения 
* path.join(path.dirname(require.main.filename)
***
### Деструкция и возврат из функции
* candidate = (({title, price, id}) => ({title, price, id}))(course)
***
### Форматирование чисел
* Intl.NumberFormat
***
\&ensp; - Два пробела  
\&emsp; - Четыре пробела
***