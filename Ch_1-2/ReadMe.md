# Раздел 1, 2 -- Введение. Основы NodeJS.
***
### Vs Cod Extension:
  * Auto close tag
  * Auto rename tag
  * Bracket Pair Colorizer
  * CSS peek
  * IntelliSenseditor Config for VsCod
  * For CSS class names in HTML
  * Open in browser
  * Path Intellisense
  * Vscode-icons
  * Vetur // для VUE JS
***
### NPM
* npm init        &emsp;// Инициализация приложения  
* npm install -D  &emsp;// Установка пакета в dev зависимости
* package.json { main: '<имя главного файла>' }

***
### npm i nodemon -D
* package.json {"scripts" : {"start" : node index.js, "dev" : nodemon index.js} }
***
### Кирилица из \<input>
* Данные из \<input> по умолчанию кодируются в  URL encoded (ФФ = %D0%A4%D0%A4)
Для исправления \<form enctype="text/plain"></form> или  decodeURI()
***

### \<form enctype=" "> </form>  
Если значение атрибута method='post'. 
Возможные значения:
* application/x-www-form-urlencoded  &emsp;Значение по умолчанию, если атрибут не задан.
* multipart/form-data  &emsp;Используйте это значение, если пользуетесь элементом \<input> атрибутом type установленным в "file".
* text/plain &emsp;(HTML5)
***
### Для отправки JSON
* 'Content-Type': 'application/json'
***
### Для отправки JSONP
* 'Content-Type': 'application/javascript'
***