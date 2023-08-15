const Task = require('../models/taskModel');



/**
 * ! CREATE NEW TASK IN THE DATABASE
 * @param {*} data of the model task
 * @returns a task document
 */
const createTaskService = (data) => {
    // ! return of Task.create
    // ? is the document created with its id
    // * Task is a promise
    const task = Task.create(data);
    return task;
}


/**
 * 
 * @param {*} data object type
 * @returns 
 */
const getTasksService = (data) => {
    const tasks = Task.find(data).select('+completed');
    return tasks
}

/**
 * ! GET TASK BY ID 
 * @param {*} id OF THE TASK
 * @returns ONE TASK
 */
const getTaskByIdService = (id) => {
    const task = Task.findById({_id: id});
    return task;
}


/**
 * ! UPDATE TASK
 * @param {*} id of the task
 * @param {*} data updated
 * @returns updated task
 */
const updateTaskService = (id, data) => {
    // ? id of the document to update
    // ? the data to be updated
    const task = Task.findByIdAndUpdate(
        {_id: id},
        data,
    {new: true, runValidators: true, overwrite: true}
       
    )
  
    return task;
} 



/**
 * ! DELETE TASK
 * @param {*} id of task
 * @returns deleted task
 */
const deleteTaskService = (id) => {
    return Task.findByIdAndDelete({_id: id})
}
// ? WE HAVE TO EXPORT OUR SERVICES
// ? SO WE CAN USE IT IN OUR CONTROLLERS
module.exports = {
    createTaskService,
    getTaskByIdService,
    getTasksService,
    updateTaskService,
    deleteTaskService
}
