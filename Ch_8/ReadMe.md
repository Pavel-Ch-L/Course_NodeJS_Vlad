# 8. Практика. Деплой приложения
&emsp;  
### 1. Защита ключей
	• Создать папку keys с файлами index.js(функция для доступа к тем или иным ключам в 
		зависимости от системной переменной process.env.NODE_ENV === 'production' ?), 
		keys.dev.js(содержащий ключи для разработки), 
		keys.prod.js(импортирующий ключи из системных переменных)

### 2. Добавление хедеров
	• Npm i helmet (для формирования необходимых хедеров)
	• Подключить в index.js и использовать как мидлвэа

### 3. Сжатие статических файлов
	• Npm i compression
	• Подключить в index.js и использовать как мидлвэа

### 4. Подготовка Heroku
	• Зарегистрироваться на Heroku
	• Установить Heroku CLI (heroku -v //показать версию)
	• heroku login в консоли
	• heroku create в консоли (создать проект)
	• На сайте проекта settings нажать 'reveal config vars'  (ввести ключ-значение кроме 
		BASE_URL заменить на новый адрес ресурса без слэша на конце)
	• Перейти на сайте проекта в 'deploy' (инициализировать  Git если нет, добавить в 
		gitignore node_modules keys/keys.dev.js) добавить в стэйдж сделать комит, проверить 
		наличие в package.json scripts: {start: node index.js}
	• heroku git: remote -a <cкопировать со страницы deploy>
	• git push heroku master
	• На странице проекта нажать 'open app' (возможна ошибка mongoDb на странице проекта посмотреть 
		'Activity' - log или в консоли heroku logs)

### 5. Настройка Mongo Atlas
	• Проверить доступность по ip

***
&emsp;
# Информация
	• В бесплатном аккаунте heroku НЕ БУДЕТ РАБОТАТЬ UPLOAD КАРТИНОК
***
# Конфигурация helmet
<pre>
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}))
</pre>
***