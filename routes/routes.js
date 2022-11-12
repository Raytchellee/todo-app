const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');


router
.get('/', controller.getAllTodos)
.get('/:id', controller.getTodo)
.post('/', controller.addTodo)
.patch('/:id', controller.updateTodo)
.delete('/:id', controller.deleteTodo)





module.exports = router;