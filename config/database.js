const mongoose = require('mongoose');

//connection to mongoose
const connect = async(uri) => {
    try{
        await mongoose.connect(uri || 'mongodb://localhost:27017/todoApp',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database!')
    } catch(e){
        throw new Error(e);
    }
}



module.exports = connect;