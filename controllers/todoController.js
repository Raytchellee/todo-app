const Todo = require("../models/todo");

//get all todo
exports.getAllTodos = async (req, res) => {
  try {
    //accepts a req with page and limit entries
    let { page = 1, limit = 10 } = req.body;
    if (page < 1) page = 1;

    let todo = await Todo.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (todo.length == 0) {
      //try using return if it fails
      return res.status(404).json({
        success: false,
        message: "No Todos found!",
      });
    }
    //get total count
    const count = await Todo.countDocuments();

    //send final result
    res.status(200).json({
      success: true,
      message: "Todos found!",
      todo,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalTodos: Todo.length,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};

//get single todo
exports.getTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let todo = await Todo.findOne(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo found!",
      todo,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};

//add todo
exports.addTodo = async (req, res) => {
  try {
    let todo = await req.body;
    let newTodo = Todo.create(todo);
    if (!newTodo) {
      return res.status(400).json({
        success: false,
        message: "Creation failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo created!",
      todo: JSON.stringify(newTodo),
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    });
  }
};

//update todo
exports.updateTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let todo = req.body;
    let updated = await Todo.findOneAndUpdate(id, todo, { new: true });

    if (!updated) {
      return res.status(500).json({
        success: false,
        message: "Todo failed to update",
      });
    }
    res.status(201).json({
      success: true,
      message: "Todo updated successfully",
      updated,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

//delete todo
exports.deleteTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let deleted = await Todo.findOneAndRemove(id);
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: "Unable to delete todo",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo deleted!",
      deleted,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
