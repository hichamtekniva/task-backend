# ARCHITECTURE

- [x] MODEL
    - [x] schema -> export (interface) model
- [x] SERVICE
    - [x] Interaction : DB <---> MODEL
- [x] CONTROLLER
    - [x] LOGIC business
- [x] ROUTE
    - different routes of the feature
        - [x] ```/``` getAllTasks(GET), createTask(POST) 
        - [x] ```/:id``` getId(GET), updateTask(PATCH), delelteTask(DELETE)
- [x] SHARED-SERVICES
    - [x] db : connect to the db
    - [ ] errors [ folder ] : SOON...
- [x] MIDDLEWARES
    - [ ] error-handler : 
    ```
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again'
    }
    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
        customError.statusCode = 400
    }
    if(err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keValue)} field, please choose another value`
        customError.statusCode = 400
    }
    if(err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    ```
    - [x] not-found : 
    - [x] async-wrapper : 
    ```
    const wrapper = (fn) => {
        return async (req, res, next) {
            try{
                await fn(req, res, next)
            } catch(error) {
                next(error)
            }
        }
    }
    ```
- [x] .env : holds all env variables including secrets
- [x] app.js OR index.js : entry point of the project
- [x] package.json : holds the installed packages including their versions
    - [x] scripts for running the project
    - [x] [e.g] "start" : "nodemon index.js"