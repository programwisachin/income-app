const express = require('express')
const app = express()
var cors = require('cors')
const connectToMongo = require("./db");

app.use(cors())
connectToMongo()

const port = 5000

app.use(express.json())
// Routes
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Income app listening at http://localhost:${port}`)
})