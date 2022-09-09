const http = require('http')
const fs = require('fs')
const PATH = require('path')

const SERVER = http.createServer((req, res) => {
  if(req.method === 'GET') {
    
    if(req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      fs.readFile(PATH.join(__dirname, 'Views', 'index.html'),
      'utf-8',
      (err, content) => {
        if(err) {throw err}
        res.end(content)
      })
    } else if (req.url === '/about') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      })
      fs.readFile(PATH.join(__dirname, 'Views', 'about.html'),
      'utf-8',
      (err, content) => {
        if(err) throw err
        res.end(content)
      })
    } else if(req.url === '/api/users') {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const users = [
        {name: 'Vladelen', age: '25'},
        {name: 'Elena', age: '23'}
      ]
      //Сериализация для отправки
      res.end(JSON.stringify(users))
    }

  } else if (req.method === 'POST') {
    const body = []
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    //Данные делятся на порции и при получении очередной порции отправляются в массив
    req.on('data', data => {
      body.push(decodeURI(Buffer.from(data)))
    })

    //Все данные получены
    req.on('end', () => {
      const message =  body.toString().split('=')[1]
      res.end(`<H1>Ваше сообщение: ${message}</H1>`)
    })
  }
})

SERVER.listen(3000, () => {
  console.log('Server is stated ...')
})