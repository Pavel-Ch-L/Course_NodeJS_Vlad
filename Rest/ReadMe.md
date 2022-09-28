# 9. БД MySQL – REST API приложение
&emsp;  
### 1. Обзор приложения
	• REST + VUE + Vuetify + MySQL
	• Get - получение данных, POST - отправка на сервер новой записи, PUT - изменение записи, DELETE - удаление записи
	• vuetify version @1.5.24
  		<link href="https://cdn.jsdelivr.net/npm/vuetify@1.5.24/dist/vuetify.min.css"; rel="stylesheet">  
  		<script src="https://cdn.jsdelivr.net/npm/vuetify@1.5.24/dist/vuetify.js"></script>;

### 2. Инициализация сервера
	• Инициализировать проект
	• Установить express, nodemon, прописать скрипты
	• Сделать папку public статической
	• Вызвать сервер, написать мидлвэа для отдачи html файла при каждом обращении к серверу
	• Вынести скрипт из html в app.js

### 3. Настройка роутера
	• Создать routes/todo.js роуты get post put delete, подключить в Index.js

### 4. Установка MySQL
	• Установить MySQL Community server, WorkBench
	• При установки выбрать старую версию верификации MySQL
	• Создать новую схему в бд (charset-utf8)

### 5. Подключение к базе данных
	• npm i sequelize
	• Создать папку utils/database.js
	• npm i mysql2
	• Создать keys/keys.dev.js
	• Настроить доступ к базе в database.js
	• Написать function start() в index,js

### 6. Создание модели
	• Создать ./models/todo.js - модель

### 7. Создание задачи
	• Подключить в models/todo модель бд
	• Удалить поле date
	• Написать роут post
	• Исправить methods addTodo() в public/app.js

### 8. Завершение POST-запроса
	• Исправить работу с buffer в index.js
	• Исправить в index.html "Добавлено в ", "изменено"
	• В app.js форматировать время в filters: date ()

### 9. Получение списка задач
	• Написать метод get
	• В app.js создать метод получения из бд всех записей created()

### 10. Завершение задачи
	• Дописать <v-checkbox> в index.html добавив обработчик @changes = completeTodo(todo.id)
	• Дописать в app.js methods completeTodo(){log} (проверить в консоли id при нажатии чекбокс)
	• Дописать роутер put (найти по id, изменить поле done, сохранить в бд, отправить на клиент)
	• Дописать в app.js methods completeTodo() (fetch + id, обновить поле updatedAt)

### 11. Удаление задачи
	• Дописать роутер delete (найти запись по id и удалить, отправить на клиент пустой json)
	• Отредактировать app.js removeTodo(id)
***
&emsp;
# Информация
	• await sequelize.sync({force: true}) //удаляет существующую таблицу и создает новую
	• User.sync({ alter: true }) 					//приводит таблицу в соответствие с моделью
	• app.use(express.json())							//Из buffer в json
	• Todo.findAll() 											//Найти все
	• Todo.findAll({})										//Найти по условию
	• Todo.create({})											//Создать и сохранить
	• Todo.findByPk(+req.params.id)				//Найти по id primary key
	• todos[0].destroy()									//Удалить запись
***