const mongoose = require('mongoose');



const connectDB = (url) => {
    return mongoose.connect('mongodb+srv://user2:rim123@cluster0.ckgbpbv.mongodb.net/?retryWrites=true&w=majority');
}

module.exports = connectDB
