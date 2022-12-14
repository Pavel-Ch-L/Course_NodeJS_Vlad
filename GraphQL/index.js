const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true //localhost:3000/graphql - отладочная консоль
}))

app.use((req, res, next) => {
  res.sendFile('/index.html')
})

async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server starting on PORT ${PORT} ...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
