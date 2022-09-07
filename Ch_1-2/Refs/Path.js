const path = require('path');

//Имя файла
console.log('path.basename(__filename)   => ',path.basename(__filename));

//Путь
console.log('path.dirname(__filename)    => ',path.dirname(__filename));

//Расширение
console.log('path.extname(__filename)    =>', path.extname(__filename));

//Информация о файле в виде объекта
console.log('path.parse(__filename)      => ', path.parse(__filename));

//Генерирование пути
console.log('path.join(__dirname, \'test\', \'second.html\') => ', path.join(__dirname, 'test', 'second.html'));

//Генерирование абсолютного пути (работает справа налево, пока не построит абс путь - /)
console.log('path.resolve(__dirname, \'test\', \'second.html\') => ', path.resolve(__dirname, './test', 'second.html'));
