
const mongoose = require('mongoose');


const uri = "mongodb+srv://orgilr84:Orgil20081124@cluster0.q4cfyfw.mongodb.net/?retryWrites=true&w=majority"


const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch {
        console.log('Disconnected from MongoDB');
    }
}


connect();

module.exports = connect;   