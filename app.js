
require('dotenv').config(); 
require('express-async-errors');


const mongoose = require('mongoose')
const express = require('express');
const connectDB = require('./shared-services/db');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const taskRouter = require('./routes/taskRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error-handler');
// ! if port in .env OR take the 5000
const port = process.env.port
app.use(express.json());
app.use(cors());
// ! logging api
app.use(morgan('dev'));
app.use('/api/v1/task',  taskRouter);

app.use(notFound);
app.use(errorHandler)




// mongoose.connect('mongodb+srv://user2:rim123@cluster0.ckgbpbv.mongodb.net/?retryWrites=true&w=majority')
// .then(()=>{
//     console.log('db connect')
    
// }).catch((err)=>{
//     console.log(err)
// })
// app.listen(3000,()=>{
//     console.log('the server is connected with 3000')
// })




// const start = async() => {
//     try{
//         mongoose.set('strictQuery', true);
//     await mongoose.connect('mongodb+srv://user2:rim123@cluster0.ckgbpbv.mongodb.net/?retryWrites=true&w=majority');
//     app.listen(port, ()=>{
//         console.log(`http://localhost:${port}`);
//     })
//     } catch(error){
//         console.log(error)
//     }
   
// }
// start()
const start =async()=>{
    try {
        mongoose.set('strictQuery', true)
     await connectDB(process.env.MONGO_URI).then(()=>{
        console.log('DB connected')
    }).catch(()=>{
        console.log('DB failed')
    })
     app.listen(port,()=>{
        console.log(`http//localhost:${port}`)
    })
    } catch (error) {
        console.log(error)
    }
    }
    start()