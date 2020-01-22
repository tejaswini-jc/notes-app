const express = require('express')
const app = express()
const port = 3025
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')
app.use(express.json())
configureDB()
app.use(cors())

app.get('/', (req,res) => {
    res.send('Welcome to the phonebook app')
})

app.use('/',router)


app.listen(port, () => {
    console.log('listening to the port,',port)
})
