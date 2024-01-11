const { model, Schema } = require("mongoose")

const userschema = new Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    // location: String,
    // pic: String
})
const userModel = model("User", userschema)

module.exports = { userModel }