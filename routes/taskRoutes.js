const {
  createTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} = require('../controllers/taskControllers');

const taskRouter = require('express').Router();

// ! taskRouter.get('/', getTasksController)
// ! taskRouter.post('/', createTaskController)

taskRouter
    .route('/')
    .get(getTasksController)
    .post(createTaskController);

taskRouter
    .route('/:id')
    .get(getTaskByIdController)
    .patch(updateTaskController)
    .delete(deleteTaskController);

module.exports = taskRouter;