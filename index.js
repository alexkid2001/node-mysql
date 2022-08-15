const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const todoRouts = require('./routes/todo')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/todo', todoRouts)

app.use((req, res, next) => {
    res.sendFile('/index.html')
})
async function start() {
    try {
        await sequelize.sync()
        app.listen(PORT)
    } catch (err) {
        console.error(err)
    }
}
start()
