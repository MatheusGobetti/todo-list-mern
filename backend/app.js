const express = require('express')
const app = express()
const port = 3000
const todoRoute = require("./routes/todoRoute")

app.use(express.json())

app.use("/todo", todoRoute)

app.listen(port, () => {
  console.log(`Server running at ${3000}`)
})