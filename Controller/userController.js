const bcrypt = require("bcrypt")
const { userModel } = require("../database/schema/userSchema")



const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("Server error")
    }
}

const getOneUser = async (req, res) => {
    const id = req.params.userId
    const user = await userModel.findById(id)
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(403).send("User not found")
    }
}
const createUser = async (req, res) => {
    const data = req.body
    const password = req.body.password
    const hashedPassword = bcrypt.hashSync(password, 5)
    const info = { ...data, password: hashedPassword }
    try {
        const user = await userModel.create(info);
        console.log(password)
        console.log(hashedPassword)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send("Server error")
    }
};
const checkLogin = async (req, res) => {
    const body = req.body
    const user = await userModel.findOne({ email: body.email })


    if (user) {
        res.status(200).send(user)
    } else {
        res.status(404).send("Account not found")
    }
}

const editUser = async (req, res) => {
    const { username, age, imageUrl, aboutMe } = req.body
    try {
        const usersInfo = await userModel.findById(req.params.userId)
        if (usersInfo) {
            await userModel.findByIdAndUpdate(req.params.userId, {
                aboutMe: aboutMe, username: username, imageUrl: imageUrl, age: age
            })
            res.status(200).send(usersInfo)
        } else { res.status(404).send("User not found") }
    }
    catch (err) {
        res.status(500).send("Server error")
    }
}

module.exports = { getAllUser, createUser, checkLogin, getOneUser, editUser }