const { model, Schema } = require("mongoose")

const userschema = new Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    imageUrl: { type: String, default: "" },
    aboutMe: { type: String, default: "" }
})
const userModel = model("User", userschema)

module.exports = { userModel }