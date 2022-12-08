// ?
require('dotenv').config(); 
require('express-async-errors');
const express = require('express');
const connectDB = require('./shared-services/db');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const auth = require('./middlewares/authenticatedUser');
const taskRouter = require('./routes/taskRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error-handler');
// ! if port in .env OR take the 5000
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
// ! logging api
app.use(morgan('dev'));

app.use('/api/v1/task',  taskRouter);


app.use(notFound);
app.use(errorHandler)
const start = async() => {
    try{
    await connectDB(process.env.MONGO_URI).then(()=>console.log('db connected'));
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
    })
    } catch(error){
        console.log(error)
    }
}
start()
