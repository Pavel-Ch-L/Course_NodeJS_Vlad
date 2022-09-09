const os = require('os');

//Платформа
console.log(os.platform());

//Архитектура
console.log(os.arch());

//Процессор
console.log(os.cpus());

//Свободной памяти
console.log(os.freemem());

//Всего памяти
console.log(os.totalmem());

//Домашняя дирректория
console.log(os.homedir());

//Время работы системы
console.log((os.uptime()/60/60).toFixed(2), 'час');