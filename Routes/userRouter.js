const Router = require("express")
const bcrypt = require("bcrypt")
const { getAllUser, createUser, checkLogin, getOneUser, editUser } = require("../Controller/userController.js")
const { userModel } = require("../database/schema/userSchema.js")
const router = Router()


const validateEmail = async (req, res, next) => {
    const body = req.body;
    const Users = await userModel.findOne({ email: body.email })
    if (Users) {
        res.status(400).send({ message: "Email already in use" })
    } else {
        next()
    }
}

const validatePass = async (req, res, next) => {
    const body = req.body
    const user = await userModel.findOne({ email: body.email })
    if (user) {
        const passchecker = bcrypt.compareSync(body.password, user.password)
        if (passchecker) {
            next()
        } else {
            res.status(404).send("Password is incorrect")
        }
    } else {
        res.status(404).send("Account not found")
    }
}

router.get("/users", getAllUser);
router.get("/user/:userId", getOneUser)
router.post("/signup", validateEmail, createUser);
router.post("/login", validatePass, checkLogin);
router.put("/user/edit/:userId", editUser)


module.exports = router