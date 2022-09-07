const EventEmitter = require('events')

/* События Events
Все объекты, излучающие события, являются экземплярами EventEmitter класс. 
Эти объекты открывают eventEmitter.on() функция, которая позволяет одной или 
нескольким функциям быть прикрепленными к именованным событиям, испускаемым объектом.

Когда EventEmitter объект испускает событие, вызываются все функции, 
связанные с этим конкретным событием синхронно.

emit() Метод позволяет передавать произвольный набор аргументов функциям-слушателям.
Когда слушатель зарегистрирован с помощью eventEmitter.on() метода, 
этот слушатель вызывается каждый раз когда названное событие испускается.

on() функция, которая позволяет одной или нескольким функциям быть 
прикрепленными к именованным событиям, испускаемым объектом.
*/

class Logger extends EventEmitter {
  log(message){
    this.emit('message', `${message}---${new Date()}`)
  }
}

const logger = new Logger()

logger.on('message', data=>{
  console.log(data)
})

logger.log('Hellow World')