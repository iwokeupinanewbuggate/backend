const { model, Schema } = require("mongoose")


const factschema = new Schema({
    title: String,
    fact: String,
    like: Array,
    dislike: Array,
    userId: String,
    Date: { type: Date, default: Date.now }
})
const factmodel = model("Facts", factschema)

module.exports = { factmodel }