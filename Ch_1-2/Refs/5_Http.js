const HTTP = require('http')

const SERVER = HTTP.createServer((req, res) => {
  console.log(req.url)

  res.write('<H1>Hellow world</H1>')
  res.end()
})

SERVER.listen(3000, () => {
  console.log('Server is stated ...')
})