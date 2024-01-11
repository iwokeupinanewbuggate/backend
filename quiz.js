const express = require('express');
const router = require("./Routes/userRouter.js");
const routes = require("./Routes/factRouter.js")
const connect = require("./database/db.js")

const port = 8080
const app = express();

const cors = require("cors")
app.use(cors())
app.use(express.json());
app.use(router);
app.use(routes)
connect()
app.get('/', (req, res) => {
    res.send('hello Mother fucker')
})
app.listen(port, () => {
    console.log(`It's workin in ${port}`)
})
