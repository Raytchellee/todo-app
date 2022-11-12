const {Schema, model} = require('mongoose'); 
//My todo Schema
const todoSchema = new Schema({
        title: String,
        description: String,
        
    },{ timestamps: true });

const Todo = model('Todo', todoSchema);

module.exports = Todo;