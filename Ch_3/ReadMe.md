# 3. Практика. Express.js
&emsp;  
### 1. Настройка приложения
	• Создать проект npm init -y
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
	• Добавить partials/navbar.hbs отредактировать меню' 'Главная' 'Курсы' 'Добавить курс'
	• Сделать отступы в меню (создать папку public)
	• В index.js подключить app.use(express.static(path.join(__dirname,'public')))

### 6. Рендеринг данных
	• Подсветить активные ссылки в меню
	• Создать динамический title
	• Создать страницы во views/ courses.hbs, add.hbs, home.hbs

### 7. Регистрация роутов
	• Создать папку /routes
	• Настроить роутинг и префиксы

### 8. Обработка формы
	• Создать форму на странице add.hbs (action='/add' method='post')
	• Добавить разметку из materialize/forms/textInput  + валидацию. name=(title, price, img )
	• Добавить кнопку 'Добавить курс'
	• Добавить мидлвэр app.use(express.urlencoded({extanded: true})
	• Обработать post запрос в роутере addRoute вывести в консоль данные

### 9. Создание модели
	• Создать папку models/course.js
	• Подключить uuid (позволить генерировать ключи)
	• Доработать роутер routes/routerAdd подключить model/course
	• Обработать post '/' (создать и сохранить новый курс)
	• Cоздать класс Course и конструктор с полем this.id = uuid.v4()
	• Создать метод Save()
	• Создать папку data и файл courses.json []
	• Создать статический метод getAll() (читать массив курсов)
	• Создать метод создания объекта toJson()
	• Проверить работу функций в log
	• После сохранения курса перейти на стр courses

### 10. Вывод списка курсов
	• Написать роурер routes/routerCourses get '/'
	• Вывести все курсы на страницу courses.hbs (materialize Cart), если они есть 
	• Добавить ссылку на стр курсов 'открыть курс' href='/courses/{{id}}'

### 11. Подключение клиентских скриптов
	• Форматировать цену на фронтэнде app.js (Intl.numberFormat) + fz 2rem

### 12. Динамические параметры
	• Cоздать файл views/course.hbs (title img price)
	• Добавить новые стили (все по центру, ширину img, price)
	• Обработать нажатие 'открыть курс' в новом layouts/empty (без навбар и контейнера) на нов странице
	• Создать функцию getById()  в models/course.js и роутинг в routes/routerCourses.js (get 'courses/:id')

### 13. Редактирование курса
	• Добавит новую ссылку на стр "Курсы" 'Pедактировать' courses/id/edit?allow=true
	• Добавить routes/routerCourses новый роут get courses/:id/edit c проверкой query params 
		если нет то переход на гл стр если есть отобразить course-edit.hbs с заполнеными полями
	• Добавить во views файл course-edit (копировать из add action='courses/edit post)
	• Добавить роут courses/edit post (при нажатии редактировать на стр course-edit)
		с методом update() и затем перейти на стр курсов
	• Создать метод update() в models/courses
	• Проверить работу

### 14. Подготовка корзины
	• Добавить форму-кнопку на стр courses 'Добавить курс' action='/cart/add' post + input  id
	• Исправить верстку на стр courses.hbs
	• Создать файл routes/routerCart.js + обработать post запрос /add
	• Создать models/cart.js класс Cart
	• В роутере routes/routerCart.js post /add вызвать метод Cart.add() затем перейти в корзину
	• В роутере routes/routerCart.js обработать get cart/ вывести все в корзине cart.hbs методом Cart.fetch()
	• Создать файл views/cart.hbs
	• Добавить в навбар ссылку на корзину
	
### 15. Модель корзины
	• Реализовать Cart.add() Cart.fetch()
	• Использовать в пути require.main.filename
	• Добавить count к курсам в корзине JSON
	• Создать data/cart.json {"courses": [], "price": 0}

### 16. Вывод данных в корзине
	• Создать шаблон корзины в cart.hbs если есть
	• Создать таблицу Название количество действие
	• Добавить кнопку Удалить с атрибутом data-id и классом js-remove
	• Добавиь после таблицы общую цену

### 17. Обработка асинхронных запросов
	• Исправить путь к pablic
	• Обработать скриптом кнопку Удалить если есть (получить id вызвать  Fetch() cart/remove/id method delete
	• Реализовать статический метод remove в cart.js 
		и обработать в роутере routerCart delete '/cart/remove/:id' и отправить данные назад
	• Вывести в консоль

### 18. Динамическое изменение корзины
	• Повторить логику шаблона в js на клиенте (если есть то таблица если нет сообщение)
	• Исправить форматирование цены
	• Вывести данные о корзине на страницу
***
&emsp;
# Информация
	• Разбор req.body (у каждого \<input> д.б. атрибут name)
	• app.use(EXPRESS.urlencoded({extended: true}))
	• req.params.id     /:id динамический параметр 
	• req.query.allow   объект, содержащий все GET-параметры 
	• req.body          объект, который хранит данные, передаваемые POST или PUT запросом
	• res.sendFile(path.join(__dirName, 'vievs', 'index.html')) //Отправка html из файла на клиент
	• <li class={{#if isCourse}} active {{/if}}><a href="/courses">Courses</a></li> //Подсветка активного меню
	• res.json(cart) //Отправить на клиент json
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
	• path.join(path.dirname(require.main.filename)
***
### Деструкция и возврат из функции
	• candidate = (({title, price, id}) => ({title, price, id}))(course)
***
### Форматирование чисел
	• Intl.NumberFormat
***
### Отступы в html
	• \&ensp; - Два пробела  
	• \&emsp; - Четыре пробела
***