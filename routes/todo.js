const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

//Ger tasks list
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll()
        res.status(200).json(todos)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Serve error'
        })
    }
})

//Create task
router.post('/', async (req, res) => {
    try {
         const todo = await Todo.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Serve error'
        })
    }
})

//Change task
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(+req.params.id)
        todo.done = req.body.done
        await todo.save()
        res.status(200).json({todo})
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Serve error'
        })
    }
})

//Delete task
router.delete('/:id', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            wherw: {
                id: +req.params.id
            }
        })
        const todo = todos[0]
        await todo.destroy()
        res.status(204).json({})
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Serve error'
        })
    }
})

module.exports = router