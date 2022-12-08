const {
  createTaskService,
  getTaskByIdService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} = require('../services/taskServices');
const CustomError = require('../shared-services/errors')
const { StatusCodes } = require('http-status-codes');

/**
 * ! CREATE A NEW TASK
 * @param {*} req inbound msg from the client
 * @param {*} res outbound msg from the server
 */
const createTaskController = async (req, res) => {
  const {name, email} = req.body

  if(!name || !email) {
    throw new CustomError.BadRequestError('Please provide the name and the email')
  }
  // ? GETTING the body data
  //   console.log({...req.body})
  //   const { name, completed } = req.body;
  //   console.log(name, completed);
  const task = await createTaskService({ name, email });

  // ? sending back the result
  res.status(StatusCodes.CREATED).send(task);
};

const getTasksController = async (req, res) => {
  // ! we get the completed attribute from the query
  const completed = req.query.completed
  // ! this is where we store our attribute
  const queryObject = {}
  if(completed && completed !== ''){
    queryObject.completed = completed
  }
  const tasks = await getTasksService(queryObject);
  res
    .status(StatusCodes.OK)
    .send(tasks);
    
};

const getTaskByIdController = async (req, res) => {
  const id = req.params.id;
  const task = await getTaskByIdService(id);
  if (!task) {
    throw new CustomError.NotFoundError(`the task with id : ${id} does not exist, please check again`)
  }
  // !
  res.status(StatusCodes.OK).send(task);
};

const updateTaskController = async (req, res) => {
  // ? const id = req.params.id
  // ? const data = req.body

  // ? destructuring

  const {
    body: { name, completed },
    params: { id: id },
  } = req;
  const task = await updateTaskService(id, { name, completed });
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${id} : this ID does not exist, please check again`);
  }
  res.status(StatusCodes.OK).send(task);
};

const deleteTaskController = async (req, res) => {
  const id = req.params.id;
  const task = await deleteTaskService(id);
  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${id} : this ID does not exist, please check again`);
  }
  res.status(StatusCodes.OK).send(task);
};

module.exports = {
  createTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
};
